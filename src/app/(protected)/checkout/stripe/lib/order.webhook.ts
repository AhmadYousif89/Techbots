import { Prisma } from "@prisma/client";
import Stripe from "stripe";

import type { StripePaymentIntentLike } from "../types";
import type {
  StripeWebhookEventContext,
  StripeWebhookEventWriter,
} from "./order.shared";

/**
 * Parses the metadata from a Stripe Payment Intent to extract the Clerk user ID, the items in the order, and the shipping information.
 * This is used to retrieve the necessary information to process an order after receiving a webhook event from Stripe indicating a successful payment.
 * @param metadata - The metadata object retrieved from the Stripe Payment Intent, which contains key-value pairs representing the checkout information stored during the payment intent creation.
 * @returns An object containing the Clerk user ID, an array of StripeCheckoutItem representing the items in the order, and a StripeShippingInfo object with the shipping details. If the metadata is missing required fields or contains invalid data, the function returns null.
 */
function buildPaymentEventCreateData({
  paymentIntent,
  stripeEvent,
}: {
  paymentIntent: StripePaymentIntentLike;
  stripeEvent: StripeWebhookEventContext;
}) {
  return {
    stripeEventId: stripeEvent.stripeEventId,
    stripeEventType: stripeEvent.stripeEventType,
    stripePaymentIntentId: paymentIntent.id,
    checkoutKey: paymentIntent.metadata.checkoutKey || null,
    payload: stripeEvent.stripeEventPayload as Prisma.InputJsonValue,
  };
}

/**
 * Verifies the authenticity of a Stripe webhook event using the provided request body, signature, and webhook signing secret.
 * @param body - The raw request body received from the Stripe webhook, which contains the event data in JSON format.
 * @param signature - The value of the "Stripe-Signature" header included in the webhook request.
 * @param secret - The Stripe webhook signing secret.
 * @returns The verified Stripe event object if the verification is successful. If the verification fails, an error is thrown indicating that the signature is invalid.
 */
export function verifyStripeWebhookEvent({
  body,
  signature,
  secret,
}: {
  body: string;
  signature: string;
  secret: string;
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

  return stripe.webhooks.constructEvent(body, signature, secret);
}

/**
 * Records a Stripe webhook event in the database by creating a new payment event entry and updating the associated checkout attempt with the payment intent status.
 * This allows the application to keep track of all events related to payment intents and their corresponding checkout attempts.
 * @param paymentIntent - An object representing the Stripe Payment Intent associated with the webhook event, containing details such as the payment intent ID, amount, and metadata.
 * @param stripeEvent - An object containing the context of the Stripe webhook event, including the event ID, type, and payload.
 * @param prisma - An instance of the Prisma client.
 * @return An object indicating whether the event was recorded or if it was a duplicate, along with the event ID and creation status.
 */
export async function recordStripeEventsTimeline({
  paymentIntent,
  stripeEvent,
  checkoutAttemptStatus,
  tx,
}: {
  paymentIntent: StripePaymentIntentLike;
  stripeEvent: StripeWebhookEventContext;
  checkoutAttemptStatus?: string | null;
  tx: Pick<StripeWebhookEventWriter, "checkoutAttempt" | "paymentEvent">;
}) {
  const result = await tx.paymentEvent.createMany({
    data: [buildPaymentEventCreateData({ paymentIntent, stripeEvent })],
    skipDuplicates: true,
  });

  if (result.count === 0) return false;

  const checkoutKey = paymentIntent.metadata.checkoutKey || null;
  if (checkoutKey) {
    await tx.checkoutAttempt.updateMany({
      where: { checkoutKey },
      data: {
        stripePaymentIntentId: paymentIntent.id,
        paymentIntentStatus: checkoutAttemptStatus ?? null,
      },
    });
  }

  return true;
}

/**
 * Records a Stripe webhook event in the database and updates the associated checkout attempt with the payment intent status if applicable.
 * This allows the application to log the event and maintain an accurate record of payment intent statuses.
 * @param paymentIntent - An object representing the Stripe Payment Intent associated with the webhook event, containing details such as the payment intent ID, amount, and metadata.
 * @param stripeEvent - An object containing the context of the Stripe webhook event, including the event ID, type, and payload.
 * @param prisma - An instance of the Prisma client.
 * @return An object indicating whether the event was recorded or if it was a duplicate, along with the event ID and creation status.
 */
export async function logStripeWebhookEvent({
  paymentIntent,
  stripeEvent,
  prisma,
}: {
  paymentIntent: StripePaymentIntentLike;
  stripeEvent: StripeWebhookEventContext;
  prisma: Pick<
    StripeWebhookEventWriter,
    "$transaction" | "checkoutAttempt" | "paymentEvent"
  >;
}) {
  const recorded = await prisma.$transaction(async (tx) =>
    recordStripeEventsTimeline({
      paymentIntent,
      stripeEvent,
      checkoutAttemptStatus: paymentIntent.status ?? null,
      tx,
    }),
  );

  return recorded
    ? {
        status: "recorded" as const,
        created: true,
        eventId: stripeEvent.stripeEventId,
      }
    : {
        status: "duplicate" as const,
        created: false,
        eventId: stripeEvent.stripeEventId,
      };
}
