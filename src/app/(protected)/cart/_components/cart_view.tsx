"use client";

import { useAuth } from "@clerk/nextjs";
import { PropsWithChildren, useEffect } from "react";

import useStore from "@/app/components/hooks/use-store";
import { useCartStore } from "../_store/cart";
import { syncCart } from "../_actions/sync";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { normalizePrice } from "@/app/lib/utils";
import { Main } from "@/components/main";

type CartViewsProps = PropsWithChildren;

export function CartViews({ children }: CartViewsProps) {
  const { userId } = useAuth();
  const cartItems = useStore(useCartStore, (s) => s.cart);

  useEffect(() => {
    if (!userId || !cartItems) return;

    syncCart(
      userId,
      cartItems.map((item) => ({
        asin: item.asin,
        price: normalizePrice(item.price),
        cartQuantity: item.cartQuantity,
      })),
    );
  }, [userId, cartItems]);

  const hasCartItems = (cartItems?.length ?? 0) > 0;

  return (
    <Tabs asChild defaultValue="cart">
      <Main className="mt-2 flex flex-col">
        <TabsList className="lg:max-view flex h-20 *:size-full sm:gap-8">
          <TabsTrigger
            id="cart-list"
            value="cart"
            className="gap-2 border-b-2 border-transparent text-xs hover:bg-primary-foreground data-[state=active]:border-primary sm:text-sm"
          >
            <span className="hidden sm:block">1.</span> Shopping Cart
          </TabsTrigger>
          <TabsTrigger
            id="cart-details"
            value="details"
            disabled={!hasCartItems}
            className="gap-2 border-b-2 border-transparent text-xs hover:bg-primary-foreground data-[state=active]:border-primary sm:text-sm"
          >
            <span className="hidden sm:block">2.</span> Shipping Details
          </TabsTrigger>
        </TabsList>
        {children}
      </Main>
    </Tabs>
  );
}
