import { Image } from "@unpic/react";
import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { formatPrice, normalizePrice } from "@/app/lib/utils";

import { getOrderForUser, type SingleUserOrder } from "../_lib/orders";
import { Main } from "@/components/main";
import { getPaymentTimelineForOrder } from "../_lib/payment_timeline";
import { PaymentTimelineCard } from "../_components/payment_timeline";
import {
  NEXT_DAY_SHIPPING_COST,
  VAT_PERCENTAGE,
} from "../../cart/_lib/constants";

type OrderDetails = NonNullable<SingleUserOrder>;
type OrderLineItem = OrderDetails["orderItems"][number];

type OrderProps = {
  params: { oid: string };
};

type ShippingInfo = {
  firstname: string;
  lastname: string;
  mainAddress: string;
  optionalAddress?: string;
  city: string;
  phone: number;
  shipping: "free" | "next";
};

function getShippingInfo(order: OrderDetails) {
  if (typeof order.shippingInfo !== "object" || order.shippingInfo === null) {
    return null;
  }

  const shippingInfo = order.shippingInfo as Partial<ShippingInfo>;
  if (
    !shippingInfo.firstname ||
    !shippingInfo.lastname ||
    !shippingInfo.mainAddress ||
    !shippingInfo.city ||
    !shippingInfo.phone ||
    (shippingInfo.shipping !== "free" && shippingInfo.shipping !== "next")
  ) {
    return null;
  }

  return shippingInfo as ShippingInfo;
}

export default async function OrderPage({ params: { oid } }: OrderProps) {
  const { userId } = auth();

  if (!userId) notFound();

  const order = await getOrderForUser(userId, oid);
  if (!order) notFound();

  const timeline = await getPaymentTimelineForOrder({
    clerkUserId: userId,
    order: {
      id: order.id,
      stripePaymentIntentId: order.stripePaymentIntentId,
      createdAt: order.createdAt,
    },
    orderCreatedAt: order.createdAt,
  });

  const shippingInfo = getShippingInfo(order);
  const itemCount = order.orderItems.reduce(
    (acc: number, item: OrderLineItem) => acc + item.count,
    0,
  );
  const total = order.orderItems.reduce(
    (acc: number, item: OrderLineItem) =>
      acc + normalizePrice(item.product.price) * item.count,
    0,
  );

  return (
    <Main className="bg-background">
      <Card className="flex flex-col rounded-none border-0 px-4 py-8 shadow-none xl:p-8">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="truncate text-2xl text-muted-foreground">
              #{order.id}
            </span>
            <Link
              href="/orders"
              className="whitespace-nowrap p-1 text-sm font-medium text-muted-foreground hover:text-blue-500 hover:underline"
            >
              Back to Orders
            </Link>
          </CardTitle>
          <CardDescription className="inline-flex gap-1">
            <span>Placed by</span>[
            <span className="font-semibold">
              {order.user.username || "Anonymous"}
            </span>
            ] on [
            <span className="font-semibold">
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(order.createdAt)}
            </span>
            ]
          </CardDescription>
        </CardHeader>

        <Card className="mb-8 p-4">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-lg font-semibold text-muted-foreground">
              Purchased Items
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-0 pb-0 *:flex-1 md:flex-row lg:gap-8">
            {order.orderItems.map(({ product, count }: OrderLineItem) => (
              <Card
                key={`${product.asin}-${count}`}
                className="flex items-center gap-4 rounded-none border-0 bg-transparent p-4 shadow-none"
              >
                <Image
                  className="size-16 object-cover"
                  width={100}
                  height={100}
                  src={product.mainImage}
                  alt={product.title}
                />
                <div className="flex max-w-prose flex-col gap-2">
                  <Link
                    href={`/products/${product.asin}`}
                    className="hover:text-blue-500 hover:underline"
                  >
                    <p className="text-xs font-medium text-muted-foreground">
                      {product.title}
                    </p>
                  </Link>
                  <p className="text-sm font-medium">
                    {count} x ${formatPrice(product.price)}
                  </p>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col justify-between gap-4 *:flex-1 md:flex-row">
          <Card className="p-4">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="pb-2 text-lg font-semibold text-muted-foreground">
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="divide-y text-sm *:p-2">
                <p className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </p>

                <p className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${formatPrice(total)}</span>
                </p>

                <p className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <span>VAT</span>
                  <span>${formatPrice(total * VAT_PERCENTAGE)}</span>
                </p>

                <p className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <span>
                    Shipping{" "}
                    {shippingInfo?.shipping === "next"
                      ? "(Next day)"
                      : "(Standard)"}
                  </span>
                  <span>
                    {shippingInfo?.shipping === "next"
                      ? `+$${NEXT_DAY_SHIPPING_COST}`
                      : "+$0"}
                  </span>
                </p>

                <p className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <span>Status</span>
                  <span>Paid</span>
                </p>
              </div>

              <CardFooter className="mt-4 h-10 items-center justify-between border-t border-muted-foreground bg-muted p-0 px-2 font-semibold uppercase text-muted-foreground hover:bg-muted/50">
                <span>Total</span>
                <span className="text-foreground">
                  ${formatPrice(order.pricePaid)}
                </span>
              </CardFooter>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="pb-2 text-lg font-semibold text-muted-foreground">
                Shipping Info
              </CardTitle>
            </CardHeader>
            <div className="grid gap-2 border-l pl-4">
              <CardDescription>
                Name:{" "}
                <span className="font-semibold">
                  {shippingInfo
                    ? `${shippingInfo.firstname} ${shippingInfo.lastname}`
                    : "Unknown"}
                </span>
              </CardDescription>
              <Separator />
              <CardDescription>
                Email:{" "}
                <span className="font-semibold">
                  {/* TODO: Get the customer's email address from the checkout page.*/}
                  {order.user.email || "Unknown"}
                </span>
              </CardDescription>
              <Separator />
              <CardDescription>
                Address:{" "}
                <span className="font-semibold">
                  {shippingInfo
                    ? [
                        shippingInfo.mainAddress,
                        shippingInfo.optionalAddress,
                        shippingInfo.city,
                      ]
                        .filter(Boolean)
                        .join(", ")
                    : "Unknown"}
                </span>
              </CardDescription>
              <Separator />
              <CardDescription>
                Contact Phone:{" "}
                <span className="font-semibold">
                  {shippingInfo?.phone || "Unknown"}
                </span>
              </CardDescription>
              <Separator />
              <CardDescription>
                City:{" "}
                <span className="font-semibold">
                  {shippingInfo?.city || "Unknown"}
                </span>
              </CardDescription>
            </div>
          </Card>
        </div>

        <PaymentTimelineCard timeline={timeline} className="mt-8" />
      </Card>
    </Main>
  );
}
