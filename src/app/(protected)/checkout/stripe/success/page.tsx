import Stripe from "stripe";
import Link from "next/link";
import { Image } from "@unpic/react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/main";
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

  let orderId: string | null = null;

  if (isSuccessful) {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SERVER_URL
        : "http://localhost:3000";

    try {
      const result = await processSuccessfulPaymentIntent({
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
      if (result.orderId) {
        orderId = result.orderId;
      }
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

  const formatIntentId = (id: string) => {
    return id.length > 16 ? `${id.slice(0, 8)}...${id.slice(-8)}` : id;
  };

  const recipientEmail = paymentIntent.receipt_email || "your email";

  return (
    <Main className="relative flex min-h-[85vh] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50/30 via-background to-background px-4 py-12 dark:from-emerald-950/10">
      <style>{`
        @keyframes drawCheckmark {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.96); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.06); }
        }
        .animate-draw-checkmark {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: drawCheckmark 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite ease-in-out;
        }
      `}</style>

      {isSuccessful ? <ClearLocalCartOnSuccess /> : null}

      <div className="animate-scale-in w-full max-w-lg">
        <Card className="relative overflow-hidden border border-muted/80 bg-card/60 shadow-2xl backdrop-blur-xl dark:bg-card/40">
          <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />

          <CardHeader className="flex flex-col items-center pb-4 pt-8 text-center">
            {isSuccessful ? (
              <div className="relative mb-4 flex items-center justify-center">
                <div className="animate-pulse-glow absolute h-16 w-16 rounded-full bg-emerald-400/20" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-draw-checkmark"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="relative mb-4 flex items-center justify-center">
                <div className="animate-pulse-glow absolute h-16 w-16 rounded-full bg-destructive/20" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            )}

            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              {isSuccessful ? "Payment Successful!" : "Payment Failed"}
            </CardTitle>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {isSuccessful
                ? `Thank you for your purchase. We've sent a receipt and confirmation email to ${recipientEmail}.`
                : "Something went wrong with the transaction. Your account has not been charged."}
            </p>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-4">
            <div className="rounded-xl border border-muted/60 bg-muted/30 p-4 dark:bg-muted/10">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                <div className="font-medium text-muted-foreground">
                  Order Status
                </div>
                <div className="text-right">
                  {isSuccessful ? (
                    <Badge
                      variant="default"
                      className="pointer-events-none border-0 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:bg-emerald-500/20 dark:text-emerald-400"
                    >
                      Paid
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="pointer-events-none border-0"
                    >
                      Failed
                    </Badge>
                  )}
                </div>

                <div className="font-medium text-muted-foreground">
                  Payment ID
                </div>
                <div className="text-right font-mono font-semibold text-foreground">
                  {formatIntentId(paymentIntent.id)}
                </div>

                {isSuccessful && (
                  <>
                    <div className="font-medium text-muted-foreground">
                      Amount Charged
                    </div>
                    <div className="text-right font-bold text-foreground">
                      ${formatPrice(paymentIntent.amount / 100)}
                    </div>
                  </>
                )}

                {parsedMetadata?.shippingInfo?.shipping && (
                  <>
                    <div className="font-medium text-muted-foreground">
                      Delivery Method
                    </div>
                    <div className="text-right font-semibold text-foreground">
                      {parsedMetadata.shippingInfo.shipping === "next"
                        ? "Next Day Shipping"
                        : "Free Standard Shipping"}
                    </div>
                  </>
                )}
              </div>
            </div>

            {orderedProducts.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Purchased Items
                </h3>
                <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                  {orderedProducts.map((product) => (
                    <div
                      key={product.asin}
                      className="flex items-center gap-4 rounded-lg border border-muted/50 bg-background/40 p-2.5 shadow-sm dark:bg-background/20"
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-white p-1">
                        <Image
                          src={product.mainImage}
                          alt={product.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                        <div className="min-w-0">
                          <Link
                            href={`/products/${product.asin}`}
                            className="block truncate text-xs font-semibold text-foreground hover:text-blue-500 hover:underline"
                          >
                            {product.title}
                          </Link>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            ASIN: {product.asin}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="shrink-0 text-xs font-medium"
                        >
                          ${formatPrice(product.price)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isSuccessful ? (
              <p className="text-center text-xs text-muted-foreground">
                Your order is completed. We could not fetch item details right
                now, but your order history is updated.
              </p>
            ) : null}
          </CardContent>

          <Separator className="bg-muted/80" />

          <CardFooter className="flex flex-col gap-3 px-6 py-6 sm:flex-row">
            {isSuccessful ? (
              <>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 font-medium text-white shadow-md transition-all hover:from-emerald-600 hover:to-teal-700 active:scale-[0.98] sm:flex-1"
                >
                  <Link href={orderId ? `/orders/${orderId}` : "/orders"}>
                    View order details
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-muted font-medium transition-all hover:bg-muted/50 active:scale-[0.98] sm:flex-1"
                >
                  <Link href="/products">Continue shopping</Link>
                </Button>
              </>
            ) : (
              <Button
                asChild
                variant="default"
                className="w-full bg-destructive font-medium text-white transition-all hover:bg-destructive/90 active:scale-[0.98]"
              >
                <Link href="/checkout/stripe?">Try Again</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Main>
  );
}
