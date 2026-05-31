import assert from "node:assert/strict";
import Stripe from "stripe";

import {
  buildPaymentIntentMetadata,
  processSuccessfulPaymentIntent,
  verifyStripeWebhookEvent,
} from "./stripe-order";

const webhookSecret = "whsec_test_secret";

const snapshot = {
  items: [
    { asin: "B07JGJ7B17", cartQuantity: 2 },
    { asin: "B07JGJ7B18", cartQuantity: 1 },
  ],
  shippingInfo: {
    firstname: "Ada",
    lastname: "Lovelace",
    mainAddress: "123 Code Lane",
    optionalAddress: "Suite 4",
    city: "London",
    phone: 5551234,
    shipping: "next" as const,
  },
  coupon: "25off",
};

function createPaymentIntent(
  overrides: Partial<{ id: string; amount: number }> = {},
) {
  return {
    id: overrides.id ?? "pi_test_123",
    amount: overrides.amount ?? 12345,
    amount_received: overrides.amount ?? 12345,
    metadata: buildPaymentIntentMetadata({
      clerkUserId: "user_123",
      snapshot,
    }),
  };
}

function createFakePrisma() {
  const store: Array<any> = [];

  const prisma: any = {
    $transaction: async (callback: (tx: any) => Promise<any>) =>
      callback(prisma),
    order: {
      findUnique: async ({
        where,
      }: {
        where: { stripePaymentIntentId: string };
      }) => {
        return (
          store.find(
            (order) =>
              order.stripePaymentIntentId === where.stripePaymentIntentId,
          ) ?? null
        );
      },
      create: async ({ data }: { data: any }) => {
        const order = {
          id: `order_${store.length + 1}`,
          ...data,
        };
        store.push(order);
        return { id: order.id };
      },
    },
    user: {
      findUnique: async () => ({
        email: "customer@example.com",
        username: "Customer",
      }),
    },
  };

  return { prisma, store };
}

async function run() {
  const payload = JSON.stringify({
    id: "evt_test_123",
    type: "payment_intent.succeeded",
    data: { object: createPaymentIntent() },
  });

  const validSignature = Stripe.webhooks.generateTestHeaderString({
    payload,
    secret: webhookSecret,
  });

  const event = verifyStripeWebhookEvent({
    body: payload,
    signature: validSignature,
    secret: webhookSecret,
  });

  assert.equal(event.type, "payment_intent.succeeded");

  const invalidPayload = JSON.stringify({
    id: "evt_test_456",
    type: "payment_intent.succeeded",
    data: { object: createPaymentIntent() },
  });

  const invalidSignature = Stripe.webhooks.generateTestHeaderString({
    payload: invalidPayload,
    secret: "whsec_wrong_secret",
  });

  assert.throws(() =>
    verifyStripeWebhookEvent({
      body: invalidPayload,
      signature: invalidSignature,
      secret: webhookSecret,
    }),
  );

  const { prisma, store } = createFakePrisma();
  let emailCalls = 0;

  const result = await processSuccessfulPaymentIntent({
    paymentIntent: createPaymentIntent(),
    prisma,
    sendEmail: async () => {
      emailCalls += 1;
      return { ok: true };
    },
    ordersUrl: "https://techbots.example/orders",
  });

  assert.equal(result.created, true);
  assert.equal(result.emailSent, true);
  assert.equal(store.length, 1);
  assert.equal(store[0].stripePaymentIntentId, "pi_test_123");
  assert.equal(store[0].orderItems.create.length, snapshot.items.length);
  assert.equal(emailCalls, 1);

  const idempotentResult = await processSuccessfulPaymentIntent({
    paymentIntent: createPaymentIntent(),
    prisma,
    sendEmail: async () => {
      emailCalls += 1;
      return { ok: true };
    },
    ordersUrl: "https://techbots.example/orders",
  });

  assert.equal(idempotentResult.created, false);
  assert.equal(store.length, 1);
  assert.equal(emailCalls, 1);

  const { prisma: emailFailurePrisma, store: emailFailureStore } =
    createFakePrisma();
  const emailFailureResult = await processSuccessfulPaymentIntent({
    paymentIntent: createPaymentIntent(),
    prisma: emailFailurePrisma,
    sendEmail: async () => ({
      ok: false,
      error: new Error("Resend unavailable"),
    }),
    ordersUrl: "https://techbots.example/orders",
  });

  assert.equal(emailFailureResult.created, true);
  assert.equal(emailFailureResult.emailSent, false);
  assert.equal(emailFailureStore.length, 1);

  const { prisma: skippedPrisma, store: skippedStore } = createFakePrisma();
  const skippedResult = await processSuccessfulPaymentIntent({
    paymentIntent: {
      id: "pi_empty_metadata",
      amount: 12345,
      amount_received: 12345,
      metadata: {},
    },
    prisma: skippedPrisma,
    sendEmail: async () => ({
      ok: true,
    }),
    ordersUrl: "https://techbots.example/orders",
  });

  assert.equal(skippedResult.status, "skipped");
  assert.equal(skippedResult.created, false);
  assert.equal(skippedResult.emailSent, false);
  assert.equal(skippedResult.orderId, null);
  assert.equal(skippedStore.length, 0);

  console.log("Stripe webhook checks passed");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
