import prisma from "@/app/lib/db";
import type {
  PaymentTimeline,
  PaymentTimelineEntry,
  PaymentTimelineEvent,
  PaymentTimelineOrder,
  PaymentTimelineSummary,
  PaymentTimelineStatusValue,
  PaymentTimelineCheckoutAttempt,
} from "./types";

function shorten(value: string, length = 12) {
  if (value.length <= length) return value;
  return `${value.slice(0, length)}…`;
}

function getStripeEventSummary(
  stripeEventType: string,
): PaymentTimelineSummary {
  switch (stripeEventType) {
    case "payment_intent.succeeded":
      return { value: "succeeded", label: "Paid", variant: "default" };
    case "payment_intent.payment_failed":
      return { value: "failed", label: "Failed", variant: "destructive" };
    case "payment_intent.canceled":
      return { value: "canceled", label: "Canceled", variant: "outline" };
    default:
      return { value: "unknown", label: "Processing", variant: "secondary" };
  }
}

function getCheckoutAttemptSummary(
  paymentIntentStatus: string | null,
): PaymentTimelineSummary {
  switch (paymentIntentStatus) {
    case "succeeded":
      return { value: "succeeded", label: "Paid", variant: "default" };
    case "failed":
    case "payment_failed":
      return { value: "failed", label: "Failed", variant: "destructive" };
    case "canceled":
      return { value: "canceled", label: "Canceled", variant: "outline" };
    case "pending":
      return { value: "pending", label: "Pending", variant: "secondary" };
    default:
      return { value: "unknown", label: "Unknown", variant: "secondary" };
  }
}

function buildCheckoutAttemptEntry(
  checkoutAttempt: PaymentTimelineCheckoutAttempt,
): PaymentTimelineEntry {
  const summary = getCheckoutAttemptSummary(
    checkoutAttempt.paymentIntentStatus,
  );

  const titleByStatus: Record<PaymentTimelineStatusValue, string> = {
    pending: "Checkout started",
    succeeded: "Payment confirmed",
    failed: "Payment failed",
    canceled: "Checkout canceled",
    unknown: "Checkout saved",
  };

  const descriptionByStatus: Record<PaymentTimelineStatusValue, string> = {
    pending: "A payment intent was prepared from the saved checkout snapshot.",
    succeeded: "The payment intent was confirmed and linked to this order.",
    failed: "The checkout attempt did not complete successfully.",
    canceled: "The checkout attempt was canceled before completion.",
    unknown:
      "The checkout snapshot was stored before payment processing completed.",
  };

  return {
    id: `checkout-${checkoutAttempt.checkoutKey}`,
    title: titleByStatus[summary.value],
    description: descriptionByStatus[summary.value],
    occurredAt: checkoutAttempt.createdAt,
    variant: summary.variant,
    kind: "checkout_attempt",
    reference: {
      label: "Checkout key",
      value: shorten(checkoutAttempt.checkoutKey),
    },
  };
}

function buildStripeEventEntry(
  paymentEvent: PaymentTimelineEvent,
): PaymentTimelineEntry {
  const summary = getStripeEventSummary(paymentEvent.stripeEventType);

  const titleByType: Record<string, string> = {
    "payment_intent.succeeded": "Stripe confirmed payment",
    "payment_intent.payment_failed": "Stripe reported failure",
    "payment_intent.canceled": "Stripe canceled payment",
  };

  const descriptionByType: Record<string, string> = {
    "payment_intent.succeeded":
      "Stripe confirmed the payment intent as successful.",
    "payment_intent.payment_failed":
      "Stripe reported that the payment intent did not complete.",
    "payment_intent.canceled":
      "Stripe canceled the payment intent before completion.",
  };

  return {
    id: paymentEvent.stripeEventId,
    title: titleByType[paymentEvent.stripeEventType] ?? "Stripe event recorded",
    description:
      descriptionByType[paymentEvent.stripeEventType] ??
      `Recorded Stripe event type ${paymentEvent.stripeEventType}.`,
    occurredAt: paymentEvent.createdAt,
    variant: summary.variant,
    kind: "stripe_event",
    reference: {
      label: "Event ID",
      value: shorten(paymentEvent.stripeEventId),
    },
  };
}

function deriveCurrentStatus({
  checkoutAttempt,
  paymentEvents,
  order,
}: {
  checkoutAttempt: PaymentTimelineCheckoutAttempt | null;
  paymentEvents: PaymentTimelineEvent[];
  order: PaymentTimelineOrder;
}): PaymentTimelineSummary {
  const latestEvent = paymentEvents[paymentEvents.length - 1];

  if (latestEvent) {
    return getStripeEventSummary(latestEvent.stripeEventType);
  }

  if (checkoutAttempt) {
    const checkoutSummary = getCheckoutAttemptSummary(
      checkoutAttempt.paymentIntentStatus,
    );

    if (checkoutSummary.value !== "unknown") {
      return checkoutSummary;
    }
  }

  if (order.stripePaymentIntentId) {
    return { value: "succeeded", label: "Paid", variant: "default" };
  }

  return { value: "unknown", label: "Unknown", variant: "secondary" };
}

export async function getPaymentTimelineForOrder({
  clerkUserId,
  order,
  orderCreatedAt,
}: {
  clerkUserId: string;
  order: PaymentTimelineOrder;
  orderCreatedAt: Date;
}): Promise<PaymentTimeline | null> {
  if (!order.stripePaymentIntentId) return null;

  const [checkoutAttempt, paymentEvents] = await Promise.all([
    prisma.checkoutAttempt.findFirst({
      where: {
        clerkUserId,
        stripePaymentIntentId: order.stripePaymentIntentId,
      },
      select: {
        checkoutKey: true,
        createdAt: true,
        paymentIntentStatus: true,
      },
    }),
    prisma.paymentEvent.findMany({
      where: {
        stripePaymentIntentId: order.stripePaymentIntentId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        createdAt: true,
        stripeEventId: true,
        stripeEventType: true,
      },
    }),
  ]);

  const entries: PaymentTimelineEntry[] = [];

  if (checkoutAttempt) {
    entries.push(buildCheckoutAttemptEntry(checkoutAttempt));
  }

  entries.push(
    ...paymentEvents.map((paymentEvent) => buildStripeEventEntry(paymentEvent)),
  );

  entries.push({
    id: `order-${order.id}`,
    title: "Order recorded",
    description:
      "The order projection is now available in your account and order history.",
    occurredAt: orderCreatedAt,
    variant: "secondary",
    kind: "order_projection",
    reference: {
      label: "Order ID",
      value: shorten(order.id),
    },
  });

  return {
    currentStatus: deriveCurrentStatus({
      checkoutAttempt,
      paymentEvents,
      order,
    }),
    entries,
  };
}
