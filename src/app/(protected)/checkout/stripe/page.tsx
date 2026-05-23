import Stripe from "stripe";
import prisma from "@/app/lib/db";
import { Checkout } from "../_component/checkout";
import { SearchParams } from "@/app/lib/types";
import { normalizePrice } from "@/app/lib/utils";

export const metadata = {
  title: "Checkout",
  description: "Checkout your items and pay securely with Stripe.",
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type PageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: PageProps) {
  const items: { asin: string; cartQuantity: number }[] = [];
  Object.entries(searchParams).map((item) => {
    const rawValue = Array.isArray(item[1]) ? item[1][0] : item[1];
    if (!rawValue) {
      return;
    }
    const [asin, quantity] = rawValue.split(" ");
    const prod = {
      asin,
      cartQuantity: Number(quantity || 1),
    };
    items.push(prod);
  });

  const products = await prisma.product.findMany({
    where: {
      asin: {
        in: items.map((item) => item.asin) as string[],
      },
    },
  });

  const totalAmount = products.reduce((acc, item) => {
    const cartItem = items.find((cartItem) => cartItem.asin === item.asin);
    return (
      acc + normalizePrice(item.price) * Number(cartItem?.cartQuantity || 1)
    );
  }, 0);

  const result: { [k: string]: string } = {};
  items.forEach((item, index) => {
    result[index + 1] = item.asin ?? "";
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // in cents
    currency: "USD",
    metadata: result, // { '1': 'B07JGJ7B17', '2': 'B07JGJ7B18'}
  });

  if (paymentIntent.client_secret == null) {
    throw new Error("Stripe -- Failed to create a payment intent");
  }

  return (
    <main className="max-view mx-auto min-h-screen bg-background">
      <Checkout clientSecret={paymentIntent.client_secret} />
    </main>
  );
}
