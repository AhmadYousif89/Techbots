"use client";

import { useAuth } from "@clerk/nextjs";
import { PropsWithChildren, useEffect } from "react";

import { useCartStore } from "../_store/cart";
import { syncCart } from "../_actions/actions";
import { useShippingStore } from "../_store/shipping_form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CartViewsProps = PropsWithChildren;

export function CartViews({ children }: CartViewsProps) {
  const { userId } = useAuth();
  const cartItems = useCartStore((s) => s.cart);
  const shippingFormState = useShippingStore((s) => s.formState());

  useEffect(() => {
    if (userId && cartItems.length) {
      syncCart(userId, cartItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, cartItems.length]);

  return (
    <Tabs defaultValue="cart" className="bg-muted pb-1 pt-10">
      <TabsList className="lg:max-view grid h-20 grid-cols-3 rounded-none pb-0 sm:gap-8 sm:px-0 md:mx-auto md:max-w-screen-lg md:gap-16">
        <TabsTrigger
          id="cart-list"
          value="cart"
          className="h-full gap-2 rounded-bl-none rounded-br-none text-xs hover:bg-primary-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary sm:text-sm"
        >
          <span className="hidden sm:block">1.</span> Shopping Cart
        </TabsTrigger>

        <TabsTrigger
          id="cart-details"
          value="details"
          disabled={cartItems.length == 0}
          className="h-full gap-2 rounded-bl-none rounded-br-none text-xs hover:bg-primary-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary sm:text-sm"
        >
          <span className="hidden sm:block">2.</span> Shipping Details
        </TabsTrigger>

        <TabsTrigger
          id="cart-payment"
          value="payment"
          disabled={!cartItems.length || !userId || !shippingFormState.success}
          className="h-full gap-2 rounded-bl-none rounded-br-none text-xs hover:bg-primary-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary sm:text-sm"
        >
          <span className="hidden sm:block">3.</span> Payment Options
        </TabsTrigger>
      </TabsList>

      {children}
    </Tabs>
  );
}
