import type { EmailRecipient } from "@/app/(auth)/email/order.template";
import type {
  OrderWriteResult,
  SendEmailResult,
  StripePaymentIntentLike,
  StripeWebhookProcessingResult,
} from "../types";
import { parsePaymentIntentMetadata } from "./order.metadata";
import type {
  StripeWebhookEventContext,
  StripeWebhookPrisma,
} from "./order.shared";
import { recordStripeEventsTimeline } from "./order.webhook";

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}

/**
 * Processes a successful Stripe Payment Intent by creating an order in the database, sending a confirmation email to the user, and recording the event in the webhook timeline.
 * This handles the core logic for finalizing an order after receiving a successful payment notification from Stripe, ensuring that the order is created only once and that the user is notified accordingly.
 * @param paymentIntent - An object representing the Stripe Payment Intent that was successfully completed, containing details such as the payment intent ID, amount, and metadata.
 * @param prisma - An instance of the Prisma client used to interact with the database for creating the order and recording the webhook event.
 * @param sendEmail - A function that sends an email to the user, which is called after successfully creating the order to notify the user of their purchase.
 * @param ordersUrl - The URL to the user's orders page, which is included in the confirmation email sent to the user.
 * @return An object indicating the result of processing the payment intent, including whether the order was created or if it was a duplicate, whether the confirmation email was sent, and the ID of the created order if applicable.
 */
export async function processSuccessfulPaymentIntent({
  paymentIntent,
  prisma,
  sendEmail,
  ordersUrl,
  stripeEvent,
}: {
  paymentIntent: StripePaymentIntentLike;
  prisma: StripeWebhookPrisma;
  sendEmail: (
    emailOrUser: string | EmailRecipient,
    url: string,
  ) => Promise<SendEmailResult>;
  ordersUrl: string;
  stripeEvent?: StripeWebhookEventContext;
}): Promise<StripeWebhookProcessingResult> {
  const parsedMetadata = parsePaymentIntentMetadata(paymentIntent.metadata);

  if (!parsedMetadata) {
    console.warn(
      `Skipping Stripe payment intent ${paymentIntent.id} because required order metadata is missing.`,
    );

    return {
      status: "skipped",
      created: false,
      emailSent: false,
      orderId: null,
      reason: "missing-order-metadata",
    };
  }

  const amountReceived = paymentIntent.amount_received ?? paymentIntent.amount;

  let orderId = "";
  try {
    const result = await prisma.$transaction(
      async (tx): Promise<OrderWriteResult> => {
        if (stripeEvent) {
          const recorded = await recordStripeEventsTimeline({
            paymentIntent,
            stripeEvent,
            checkoutAttemptStatus: "succeeded",
            tx,
          });

          if (!recorded) {
            const existingOrder = await tx.order.findUnique({
              where: { stripePaymentIntentId: paymentIntent.id },
            });

            if (existingOrder) {
              return {
                kind: "duplicate",
                orderId: existingOrder.id,
              };
            }
          }
        }

        const existingOrder = await tx.order.findUnique({
          where: { stripePaymentIntentId: paymentIntent.id },
        });

        if (existingOrder) {
          return {
            kind: "duplicate",
            orderId: existingOrder.id,
          };
        }

        const order = await tx.order.create({
          data: {
            stripePaymentIntentId: paymentIntent.id,
            shippingInfo: parsedMetadata.shippingInfo,
            pricePaid: amountReceived / 100,
            user: {
              connect: { clerkUserId: parsedMetadata.clerkUserId },
            },
            orderItems: {
              create: parsedMetadata.items.map((item) => ({
                product: {
                  connect: {
                    asin: item.asin,
                  },
                },
                count: item.cartQuantity,
              })),
            },
          },
        });

        return {
          kind: "created",
          orderId: order.id,
        };
      },
    );

    if (result.kind === "duplicate") {
      return {
        status: "duplicate",
        created: false,
        emailSent: false,
        orderId: result.orderId,
      };
    }

    orderId = result.orderId;
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      const existingAfterConflict = await prisma.order.findUnique({
        where: { stripePaymentIntentId: paymentIntent.id },
      });

      if (existingAfterConflict) {
        return {
          status: "duplicate",
          created: false,
          emailSent: false,
          orderId: existingAfterConflict.id,
        };
      }
    }

    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: parsedMetadata.clerkUserId },
  });

  if (!user) {
    console.error(
      `Stripe order ${orderId} was created, but the user could not be found for the confirmation email.`,
    );

    return {
      status: "created",
      created: true,
      emailSent: false,
      orderId,
    };
  }

  try {
    const emailResult = await sendEmail(
      paymentIntent.receipt_email || user,
      ordersUrl,
    );
    if (!emailResult.ok) {
      console.error(
        "Failed to send order confirmation email",
        emailResult.error,
      );
      return {
        created: true,
        emailSent: false,
        orderId,
      };
    }
  } catch (error) {
    console.error("Failed to send order confirmation email", error);
    return {
      status: "created",
      created: true,
      emailSent: false,
      orderId,
    };
  }

  return {
    status: "created",
    created: true,
    emailSent: true,
    orderId,
  };
}
