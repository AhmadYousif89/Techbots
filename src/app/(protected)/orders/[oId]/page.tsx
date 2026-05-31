import Image from "next/image";
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

type OrderDetails = NonNullable<SingleUserOrder>;
type OrderLineItem = OrderDetails["orderItems"][number];

type OrderProps = {
  params: { oId: string };
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

export default async function OrderPage({ params: { oId } }: OrderProps) {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const order = await getOrderForUser(userId, oId);
  if (!order) {
    notFound();
  }

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
    <main className="max-view mx-auto min-h-screen bg-secondary">
      <Card className="flex flex-col rounded-none px-4 py-8 xl:p-8">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center">
            Order #
            <span className="text-2xl text-muted-foreground">{order.id}</span>
          </CardTitle>
          <CardDescription>
            Placed by {order.user.username || "Anonymous"} on{" "}
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(order.createdAt)}
          </CardDescription>
        </CardHeader>
        <Separator />

        <Card className="my-8 p-4">
          <CardHeader className="p-0 py-6">
            <CardTitle className="pb-2 text-lg font-semibold text-muted-foreground">
              Items
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 px-0 pb-0 sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] lg:gap-8">
            {order.orderItems.map(({ product, count }: OrderLineItem) => (
              <Card
                key={`${product.asin}-${count}`}
                className="flex max-w-md items-center gap-4 rounded-none border-0 bg-transparent p-4 shadow-none"
              >
                <Image
                  className="size-16 object-contain"
                  width={100}
                  height={100}
                  src={product.mainImage}
                  alt={product.title}
                />
                <div className="flex flex-col gap-2">
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

        <div className="flex flex-col justify-between gap-8 *:flex-1 md:flex-row">
          <Card className="p-4">
            <CardHeader className="p-0 py-6">
              <CardTitle className="pb-2 text-lg font-semibold text-muted-foreground">
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="divide-y *:p-2">
                <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <p className="text-sm">Items</p>
                  <span className="text-sm">{itemCount}</span>
                </div>
                <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <p className="text-sm">Subtotal</p>
                  <span className="text-sm">${formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <p className="text-sm">Shipping</p>
                  <span className="text-sm">
                    {shippingInfo?.shipping === "next" ? "Next day" : "Free"}
                  </span>
                </div>
                <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <p className="text-sm">Status</p>
                  <span className="text-sm">Paid</span>
                </div>
              </div>
              <CardFooter className="mt-4 h-10 items-center justify-between border-t border-muted-foreground bg-muted p-0 px-2 font-semibold uppercase text-muted-foreground hover:bg-muted/50">
                <p>Total</p>
                <span>${formatPrice(order.pricePaid)}</span>
              </CardFooter>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="p-0 py-6">
              <CardTitle className="pb-2 text-lg font-semibold text-muted-foreground">
                Shipping Info
              </CardTitle>
            </CardHeader>
            <div className="grid gap-2 border-l pl-4">
              <CardDescription className="text-sm">
                Name:{" "}
                <span className="font-semibold">
                  {shippingInfo
                    ? `${shippingInfo.firstname} ${shippingInfo.lastname}`
                    : "Unknown"}
                </span>
              </CardDescription>
              <CardDescription className="text-sm">
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
              <CardDescription className="text-sm">
                Contact Phone:{" "}
                <span className="font-semibold">
                  {shippingInfo?.phone || "Unknown"}
                </span>
              </CardDescription>
              <CardDescription className="text-sm">
                City:{" "}
                <span className="font-semibold">
                  {shippingInfo?.city || "Unknown"}
                </span>
              </CardDescription>
              <CardDescription className="text-sm">
                Shipping:{" "}
                <span className="font-semibold">
                  {shippingInfo?.shipping === "next" ? "Next day" : "Free"}
                </span>
              </CardDescription>
            </div>
          </Card>
        </div>
      </Card>
    </main>
  );
}
