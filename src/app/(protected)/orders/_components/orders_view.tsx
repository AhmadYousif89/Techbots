import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatPrice, normalizePrice } from "@/app/lib/utils";

import type { UserOrder } from "../_lib/orders";

type OrdersViewProps = {
  orders: UserOrder[];
  user: {
    email: string;
    username: string | null;
  };
};

type ShippingInfo = {
  shipping: "free" | "next";
};

function getShippingInfo(order: UserOrder): ShippingInfo | null {
  if (typeof order.shippingInfo !== "object" || order.shippingInfo === null) {
    return null;
  }

  const shipping = (order.shippingInfo as { shipping?: unknown }).shipping;
  if (shipping !== "free" && shipping !== "next") {
    return null;
  }

  return { shipping };
}

export function OrdersView({ orders, user }: OrdersViewProps) {
  const totalSpent = orders.reduce(
    (acc: number, order: UserOrder) => acc + normalizePrice(order.pricePaid),
    0,
  );

  return (
    <Card className="rounded-none border-0 p-4 shadow-none xl:p-8">
      <CardHeader className="px-0">
        <CardTitle className="flex items-center">My Orders</CardTitle>
        <CardDescription>
          Review paid orders and open each order for shipping details.
        </CardDescription>
      </CardHeader>
      <Separator />

      <Card className="mt-8 p-4">
        <CardHeader className="p-0">
          <CardTitle className="pb-2 text-lg">Personal Info</CardTitle>
        </CardHeader>
        <div className="flex gap-4 border-l pl-4">
          <CardContent className="p-0">
            <p className="text-xs text-foreground/70 lg:text-sm">
              Name:{" "}
              <span className="font-semibold">
                {user.username || "Anonymous"}
              </span>
            </p>
            <p className="text-xs text-foreground/70 lg:text-sm">
              Email: <span className="font-semibold">{user.email}</span>
            </p>
          </CardContent>
          <CardContent className="p-0">
            <p className="text-xs text-foreground/70 lg:text-sm">
              Total orders:{" "}
              <span className="font-semibold">{orders.length}</span>
            </p>
            <p className="text-xs text-foreground/70 lg:text-sm">
              Total spent:{" "}
              <span className="font-semibold">${formatPrice(totalSpent)}</span>
            </p>
          </CardContent>
        </div>
      </Card>

      <Card className="mt-8 flex flex-col p-4">
        <CardHeader className="flex-row items-center justify-between px-0">
          <CardTitle className="flex items-center">Orders</CardTitle>
          <Badge variant="secondary">{orders.length} paid</Badge>
        </CardHeader>
        <CardContent className="p-0">
          {orders.length === 0 ? (
            <h2 className="flex items-center justify-center py-12">
              <span className="text-lg font-medium text-muted-foreground">
                You don&apos;t have any orders yet.
              </span>
            </h2>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-20 max-sm:px-0">Order</TableHead>
                  <TableHead className="min-w-20 max-sm:px-0">Items</TableHead>
                  <TableHead className="min-w-20 max-sm:px-0">
                    Shipping
                  </TableHead>
                  <TableHead className="min-w-20 max-sm:px-0">
                    Created
                  </TableHead>
                  <TableHead className="text-right max-sm:px-0">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const shippingInfo = getShippingInfo(order);
                  const itemCount = order.orderItems.reduce(
                    (acc: number, item: UserOrder["orderItems"][number]) =>
                      acc + item.count,
                    0,
                  );

                  return (
                    <TableRow key={order.id}>
                      <TableCell className="text-xs font-medium hover:underline max-sm:px-0 lg:text-sm">
                        <Link href={`/orders/${order.id}`}>
                          #{order.id.slice(0, 8)}
                        </Link>
                      </TableCell>
                      <TableCell className="text-xs max-sm:px-0 lg:text-sm">
                        {itemCount}
                      </TableCell>
                      <TableCell className="text-xs max-sm:px-0 lg:text-sm">
                        {shippingInfo?.shipping === "next"
                          ? "Next day"
                          : "Free"}
                      </TableCell>
                      <TableCell className="text-xs max-sm:px-0 lg:text-sm">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(order.createdAt)}
                      </TableCell>
                      <TableCell className="text-right text-xs max-sm:px-0 lg:text-sm">
                        ${formatPrice(order.pricePaid)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableCaption>A list of your recent orders.</TableCaption>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="link" className="hover:text-blue-600">
          <Link href="/products">Back to shop</Link>
        </Button>
      </div>
    </Card>
  );
}
