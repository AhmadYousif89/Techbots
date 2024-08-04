"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "../_store/cart";
import useStore from "@/components/hooks/use-store";
import { TOrder, useOrderStore } from "../_store/orders";
import { useShippingStore } from "../_store/shipping_form";

export function CartPaymentView() {
  const router = useRouter();
  const { userId } = useAuth();
  const items = useCartStore((s) => s.cartItems());
  const { data, setFormData } = useShippingStore();
  const total = useStore(useCartStore, (s) => s.getTotalValue()) ?? 0;
  const [orders, creatOrder] = useOrderStore((s) => [s.orders, s.creatOrder]);

  useEffect(() => {
    const ids = items
      .map((p, i) => {
        return `p${i + 1}=${p.asin}+${p.cartQuantity}`;
      })
      .join("&");

    if (orders.length > 0) {
      router.push(`/checkout/stripe?${ids}`);
    }
  }, [items, orders, router, setFormData]);

  const confirmOrder = () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    const order = {
      id: Math.random().toString(36).substring(2, 15),
      userId,
      shippingInfo: data,
      items,
      total,
    } as TOrder;

    creatOrder(order);
  };

  return (
    <Card className="min-h-screen rounded-none py-10">
      <CardHeader className="space-y-4">
        <CardTitle>Choose Your Payment</CardTitle>
        <CardDescription>
          Add your payment details. We'll use this information to process your
          order.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2"></CardContent>
      <CardFooter>
        <Button onClick={confirmOrder}>Add payment</Button>
      </CardFooter>
    </Card>
  );
}
