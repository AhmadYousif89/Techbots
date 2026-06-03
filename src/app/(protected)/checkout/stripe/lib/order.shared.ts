import type { PrismaClient } from "@prisma/client";

export type StripeWebhookPrisma = Pick<
  PrismaClient,
  "$transaction" | "checkoutAttempt" | "order" | "paymentEvent" | "user"
>;

export type StripeWebhookEventContext = {
  stripeEventId: string;
  stripeEventType: string;
  stripeEventPayload: unknown;
};

export type StripeWebhookEventWriter = Pick<
  PrismaClient,
  "$transaction" | "checkoutAttempt" | "paymentEvent"
>;
