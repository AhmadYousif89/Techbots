import type Stripe from "stripe";

import prisma from "@/app/lib/db";
import { sendEmail } from "@/app/(auth)/email/send.mail";
import {
  buildOrdersUrl,
  verifyStripeWebhookEvent,
  processSuccessfulPaymentIntent,
} from "@/app/(protected)/checkout/stripe/stripe-order";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_KEY;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SIGNING_KEY is missing.");
    return new Response("Missing Stripe webhook signing key", { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = verifyStripeWebhookEvent({
      body,
      signature,
      secret: webhookSecret,
    });
  } catch (error) {
    console.error("Error verifying Stripe webhook:", error);
    return new Response("Invalid Stripe signature", { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const result = await processSuccessfulPaymentIntent({
      paymentIntent: event.data.object,
      prisma,
      sendEmail,
      ordersUrl: buildOrdersUrl(new URL(req.url).origin),
    });

    console.log("Processed Stripe payment intent", result);
  }

  if (
    event.type === "payment_intent.payment_failed" ||
    event.type === "payment_intent.canceled"
  ) {
    console.log(`Stripe webhook received ${event.type} for ${event.id}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
