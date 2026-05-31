import type { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

import { SearchParams } from "@/app/lib/types";
import type { EmailRecipient } from "@/app/(auth)/email/order.template";
import type {
  SendEmailResult,
  StripeCheckoutItem,
  StripeShippingInfo,
  StripeCheckoutSnapshot,
  StripePaymentIntentLike,
  StripeWebhookProcessingResult,
} from "./types";

type StripeWebhookPrisma = Pick<
  PrismaClient,
  "$transaction" | "order" | "user"
>;

const stripeItemSeparator = "|";
const stripeItemValueSeparator = ":";

function toSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function encodeOrderItems(items: StripeCheckoutItem[]) {
  return items
    .map(
      (item) => `${item.asin}${stripeItemValueSeparator}${item.cartQuantity}`,
    )
    .join(stripeItemSeparator);
}

export function decodeOrderItems(value: string) {
  if (!value) return [];

  return value
    .split(stripeItemSeparator)
    .map((item) => {
      const [asin, quantityValue] = item.split(stripeItemValueSeparator);
      const cartQuantity = Number(quantityValue);

      return {
        asin,
        cartQuantity,
      };
    })
    .filter(
      (item) =>
        item.asin &&
        Number.isFinite(item.cartQuantity) &&
        item.cartQuantity > 0,
    );
}

export function parseCheckoutSnapshot(searchParams: SearchParams) {
  const items = decodeOrderItems(toSearchParamValue(searchParams.items) ?? "");
  const firstname = toSearchParamValue(searchParams.firstname);
  const lastname = toSearchParamValue(searchParams.lastname);
  const mainAddress = toSearchParamValue(searchParams.mainAddress);
  const city = toSearchParamValue(searchParams.city);
  const phoneValue = toSearchParamValue(searchParams.phone);
  const shipping = toSearchParamValue(searchParams.shipping);
  const coupon = toSearchParamValue(searchParams.coupon) ?? "";

  if (
    !items.length ||
    !firstname ||
    !lastname ||
    !mainAddress ||
    !city ||
    !phoneValue ||
    (shipping !== "free" && shipping !== "next")
  ) {
    return null;
  }

  const phone = Number(phoneValue);
  if (!Number.isFinite(phone)) return null;

  return {
    items,
    shippingInfo: {
      firstname,
      lastname,
      mainAddress,
      optionalAddress: toSearchParamValue(searchParams.optionalAddress) ?? "",
      city,
      phone,
      shipping,
    },
    coupon,
  } satisfies StripeCheckoutSnapshot;
}

export function buildPaymentIntentMetadata({
  clerkUserId,
  snapshot,
}: {
  clerkUserId: string;
  snapshot: StripeCheckoutSnapshot;
}): Record<string, string> {
  return {
    clerkUserId,
    items: encodeOrderItems(snapshot.items),
    firstname: snapshot.shippingInfo.firstname,
    lastname: snapshot.shippingInfo.lastname,
    mainAddress: snapshot.shippingInfo.mainAddress,
    optionalAddress: snapshot.shippingInfo.optionalAddress ?? "",
    city: snapshot.shippingInfo.city,
    phone: String(snapshot.shippingInfo.phone),
    shipping: snapshot.shippingInfo.shipping,
    coupon: snapshot.coupon ?? "",
  };
}

export function parseStripePaymentIntentMetadata(
  metadata: Record<string, string | undefined> | null | undefined,
) {
  const clerkUserId = metadata?.clerkUserId;
  const items = metadata?.items;
  const firstname = metadata?.firstname;
  const lastname = metadata?.lastname;
  const mainAddress = metadata?.mainAddress;
  const city = metadata?.city;
  const phoneValue = metadata?.phone;
  const shipping = metadata?.shipping;
  const coupon = metadata?.coupon ?? "";

  if (
    !clerkUserId ||
    !items ||
    !firstname ||
    !lastname ||
    !mainAddress ||
    !city ||
    !phoneValue ||
    (shipping !== "free" && shipping !== "next")
  ) {
    return null;
  }

  const phone = Number(phoneValue);
  if (!Number.isFinite(phone)) {
    return null;
  }

  const decodedItems = decodeOrderItems(items);
  if (!decodedItems.length) {
    return null;
  }

  return {
    clerkUserId,
    items: decodedItems,
    coupon,
    shippingInfo: {
      firstname,
      lastname,
      mainAddress,
      optionalAddress: metadata?.optionalAddress ?? "",
      city,
      phone,
      shipping,
    } satisfies StripeShippingInfo,
  };
}

export function buildOrdersUrl(baseUrl: string) {
  return new URL("/orders", baseUrl).toString();
}

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

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}

export async function processSuccessfulPaymentIntent({
  paymentIntent,
  prisma,
  sendEmail,
  ordersUrl,
}: {
  paymentIntent: StripePaymentIntentLike;
  prisma: StripeWebhookPrisma;
  sendEmail: (user: EmailRecipient, url: string) => Promise<SendEmailResult>;
  ordersUrl: string;
}): Promise<StripeWebhookProcessingResult> {
  const parsedMetadata = parseStripePaymentIntentMetadata(
    paymentIntent.metadata,
  );

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

  const existingOrderArgs: any = {
    where: { stripePaymentIntentId: paymentIntent.id },
  };
  const existingOrder = await prisma.order.findUnique(existingOrderArgs);

  if (existingOrder) {
    return {
      status: "duplicate",
      created: false,
      emailSent: false,
      orderId: existingOrder.id,
    };
  }

  const amountReceived = paymentIntent.amount_received ?? paymentIntent.amount;

  let orderId = "";
  try {
    const order = await prisma.$transaction(async (tx) => {
      const orderCreateArgs: any = {
        data: {
          stripePaymentIntentId: paymentIntent.id,
          clerkUserId: parsedMetadata.clerkUserId,
          shippingInfo: parsedMetadata.shippingInfo,
          pricePaid: amountReceived / 100,
          user: {
            connect: {
              clerkUserId: parsedMetadata.clerkUserId,
            },
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
      };

      return tx.order.create(orderCreateArgs);
    });

    orderId = order.id;
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      const existingAfterConflictArgs: any = {
        where: { stripePaymentIntentId: paymentIntent.id },
      };
      const existingAfterConflict = await prisma.order.findUnique(
        existingAfterConflictArgs,
      );

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
    const emailResult = await sendEmail(user, ordersUrl);
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
