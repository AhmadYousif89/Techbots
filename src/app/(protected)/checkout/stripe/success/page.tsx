import Stripe from "stripe";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

import { sendEmail } from "@/app/(auth)/email/send.mail";
import { clearServerCart } from "@/app/(protected)/cart/_actions/clear";
import { SearchParams } from "@/app/lib/types";
import { formatPrice } from "@/app/lib/utils";
import { parsePaymentIntentMetadata } from "../lib/order.metadata";
import { processSuccessfulPaymentIntent } from "../lib/order.processing";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Main } from "@/components/main";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ClearLocalCartOnSuccess } from "./_components/clear_local_cart_on_success";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
type SuccessPageProps = {
  searchParams: SearchParams;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const paymentIntentId = searchParams["payment_intent"];
  if (typeof paymentIntentId !== "string" || !paymentIntentId) {
    notFound();
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const isSuccessful = paymentIntent.status === "succeeded";
  const parsedMetadata = parsePaymentIntentMetadata(paymentIntent.metadata);

  if (isSuccessful) {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SERVER_URL
        : "http://localhost:3000";

    try {
      await processSuccessfulPaymentIntent({
        paymentIntent: {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          amount_received: paymentIntent.amount_received,
          metadata: paymentIntent.metadata ?? {},
          receipt_email: paymentIntent.receipt_email,
        },
        prisma,
        sendEmail,
        ordersUrl: new URL("/orders", baseUrl).toString(),
      });
    } finally {
      if (parsedMetadata?.clerkUserId) {
        await clearServerCart(parsedMetadata.clerkUserId);
      }
    }
  }

  const products = parsedMetadata
    ? await prisma.product.findMany({
        where: {
          asin: {
            in: parsedMetadata.items.map((item) => item.asin),
          },
        },
      })
    : [];

  const productByAsin = new Map(
    products.map((product) => [product.asin, product]),
  );
  const orderedProducts = parsedMetadata
    ? parsedMetadata.items
        .map((item) => productByAsin.get(item.asin))
        .filter((product): product is NonNullable<typeof product> =>
          Boolean(product),
        )
    : [];

  return (
    <Main className="flex flex-col">
      {isSuccessful ? <ClearLocalCartOnSuccess /> : null}
      <Card className="max-w-screen-sm rounded-none border-0 p-6 shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="font-semibold">
            {isSuccessful ? "Payment Successful!" : "Payment Failed"}
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="my-8 space-y-4 px-0">
          {orderedProducts.length > 0 ? (
            orderedProducts.map((product) => (
              <Card key={product.asin} className="flex items-center gap-4 p-2">
                <div className="p-2">
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="size-12 object-cover"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between gap-4">
                  <Link href={`/products/${product.asin}`} className="text-xs">
                    {product.title.split(" ").slice(0, 4).join(" ")}
                  </Link>
                  <Badge className="">$ {formatPrice(product.price)}</Badge>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              {isSuccessful
                ? "Your payment completed successfully. We could not load item details for this order right now."
                : "Your payment did not complete. Please try again from the checkout page."}
            </p>
          )}
        </CardContent>

        <CardFooter className="px-0">
          <Button variant={isSuccessful ? "default" : "outline"}>
            {isSuccessful ? (
              <Link href="/orders">View your order</Link>
            ) : (
              <Link href="/checkout/stripe?">Try Again</Link>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Main>
  );
}
