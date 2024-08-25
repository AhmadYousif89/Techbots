"use client";

import { use } from "react";
import Link from "next/link";

import { TItemInServerCart } from "./page";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/app/(protected)/cart/_store/cart";

type Props = {
  asin: string;
  checkItemInServerCart: Promise<TItemInServerCart>;
};

export function ViewInCartButton({ asin, checkItemInServerCart }: Props) {
  const cart = useCartStore((s) => s.cart) ?? [];
  const serverItem = use(checkItemInServerCart);
  const inCart = serverItem || cart.find((item) => item.asin === asin);

  return (
    <>
      {inCart && (
        <Button
          size={"sm"}
          className="h-auto rounded-full bg-gradient-to-tl from-primary to-primary/70 py-1 text-xs font-semibold shadow-sm hover:bg-transparent active:translate-y-px"
        >
          <Link href={`/cart`}>View in cart</Link>
        </Button>
      )}
    </>
  );
}
