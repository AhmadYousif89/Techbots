"use client";

import { useMemo } from "react";
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
import useStore from "@/app/components/hooks/use-store";
import { useShippingStore } from "../_store/shipping_form";
import { getCartTotalValue } from "../_store/cart";
import { encodeOrderItems } from "@/app/(protected)/checkout/stripe/stripe-order";

export function CartPaymentView() {
  const router = useRouter();
  const { userId } = useAuth();
  const cartItems = useStore(useCartStore, (s) => s.cart);
  const items = useMemo(() => cartItems ?? [], [cartItems]);
  const data = useShippingStore((s) => s.data);
  const coupon = useCartStore((s) => s.coupon);
  const total = getCartTotalValue(items, data.shipping, coupon);

  const checkoutUrl = useMemo(() => {
    const params = new URLSearchParams({
      firstname: data.firstname,
      lastname: data.lastname,
      mainAddress: data.mainAddress,
      optionalAddress: data.optionalAddress ?? "",
      city: data.city,
      phone: String(data.phone),
      shipping: data.shipping,
      coupon,
      items: encodeOrderItems(
        items.map((item) => ({
          asin: item.asin,
          cartQuantity: item.cartQuantity,
        })),
      ),
    });

    return `/checkout/stripe?${params.toString()}`;
  }, [coupon, data, items]);

  const confirmOrder = () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    router.push(checkoutUrl);
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
        <Button onClick={confirmOrder}>Continue to payment</Button>
      </CardFooter>
    </Card>
  );
}
