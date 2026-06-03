import Stripe from "stripe";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/app/lib/db";
import { SearchParams } from "@/app/lib/types";
import { normalizePrice } from "@/app/lib/utils";
import { Checkout } from "../_component/checkout";
import {
  buildCheckoutAttemptKey,
  buildPaymentIntentMetadata,
  parseCheckoutSnapshot,
} from "./lib/order.metadata";
import {
  VAT_PERCENTAGE,
  NEXT_DAY_SHIPPING_COST,
} from "@/app/(protected)/cart/_lib/constants";
import { Main } from "@/components/main";
import { ensureUserByClerkId } from "../../user/lib/utils";

export const metadata = {
  title: "Checkout",
  description: "Checkout your items and pay securely with Stripe.",
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { userId } = auth();
  if (!userId) notFound();

  const snapshot = parseCheckoutSnapshot(searchParams);
  if (!snapshot) notFound();

  const products = await prisma.product.findMany({
    where: {
      asin: {
        in: snapshot.items.map((item) => item.asin),
      },
    },
  });

  if (products.length !== snapshot.items.length) notFound();

  const productByAsin = new Map(
    products.map((product) => [product.asin, product]),
  );

  const subtotal = snapshot.items.reduce((acc, item) => {
    const product = productByAsin.get(item.asin);
    return acc + normalizePrice(product?.price) * item.cartQuantity;
  }, 0);

  const shippingValue =
    snapshot.shippingInfo.shipping === "next" ? NEXT_DAY_SHIPPING_COST : 0;

  const subtotalWithShipping = subtotal + shippingValue;
  const discountedTotal =
    snapshot.coupon.toLowerCase() === "25off"
      ? subtotalWithShipping * 0.75
      : snapshot.coupon.toLowerCase() === "50off"
        ? subtotalWithShipping * 0.5
        : subtotalWithShipping;

  const totalAmount = discountedTotal + discountedTotal * VAT_PERCENTAGE;

  await ensureUserByClerkId(userId);

  const checkoutKey = buildCheckoutAttemptKey({
    clerkUserId: userId,
    snapshot,
  });

  await prisma.checkoutAttempt.upsert({
    where: { checkoutKey },
    create: {
      checkoutKey,
      clerkUserId: userId,
      snapshot,
      paymentIntentStatus: "pending",
    },
    update: {
      snapshot,
      paymentIntentStatus: "pending",
    },
  });

  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: Math.round(totalAmount * 100),
      currency: "USD",
      metadata: buildPaymentIntentMetadata({
        clerkUserId: userId,
        snapshot,
        checkoutKey,
      }),
    },
    { idempotencyKey: checkoutKey },
  );

  if (paymentIntent.client_secret == null) {
    throw new Error("Stripe -- Failed to create a payment intent");
  }

  await prisma.checkoutAttempt.update({
    where: { checkoutKey },
    data: {
      stripePaymentIntentId: paymentIntent.id,
      paymentIntentStatus: paymentIntent.status,
    },
  });

  return (
    <Main>
      <Checkout clientSecret={paymentIntent.client_secret} />
    </Main>
  );
}
