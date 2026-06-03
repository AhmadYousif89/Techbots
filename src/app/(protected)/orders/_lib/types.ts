type PaymentTimelineVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline";

export type PaymentTimelineStatusValue =
  | "pending"
  | "succeeded"
  | "failed"
  | "canceled"
  | "unknown";

export type PaymentTimelineSummary = {
  value: PaymentTimelineStatusValue;
  label: string;
  variant: PaymentTimelineVariant;
};

export type PaymentTimelineEntry = {
  id: string;
  title: string;
  description: string;
  occurredAt: Date;
  variant: PaymentTimelineVariant;
  kind: "checkout_attempt" | "stripe_event" | "order_projection";
  reference?: {
    label: string;
    value: string;
  };
};

export type PaymentTimeline = {
  currentStatus: PaymentTimelineSummary;
  entries: PaymentTimelineEntry[];
};

export type PaymentTimelineOrder = {
  createdAt: Date;
  id: string;
  stripePaymentIntentId: string | null;
};

export type PaymentTimelineCheckoutAttempt = {
  checkoutKey: string;
  createdAt: Date;
  paymentIntentStatus: string | null;
};

export type PaymentTimelineEvent = {
  createdAt: Date;
  stripeEventId: string;
  stripeEventType: string;
};
