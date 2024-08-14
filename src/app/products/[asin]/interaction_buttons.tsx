"use client";

import { use } from "react";
import Link from "next/link";

import { TProduct } from "../_lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/cart_menu/add_button";
import { AddToWishlistButton } from "@/components/wishlist_menu/add_button";
import { useCartStore } from "@/app/cart/_store/cart";

type Item = {
  cartId: string;
  quantity: number;
};
type Props = {
  product: TProduct;
  getServerCartItem: Promise<Item | null>;
};

export function ProductInteractionButtons({
  product,
  getServerCartItem,
}: Props) {
  const serverCartItem = use(getServerCartItem);
  const cart = useCartStore((s) => s.cart);

  const inCart = cart.find((item) => item.asin === product.asin);

  return (
    <div className="col-span-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Badge
          className="py-1 text-muted-foreground shadow-sm"
          variant={"outline"}
        >
          $ {product.price.toFixed(2)}
        </Badge>
        {inCart && (
          <Button
            size={"sm"}
            className="h-auto rounded-full py-1 text-xs font-semibold shadow-sm active:translate-y-px"
          >
            <Link href={`/cart?cid=${serverCartItem?.cartId}`}>
              View in cart
            </Link>
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4 lg:gap-8">
        <AddToCartButton action="addToCart" product={product} />
        <AddToWishlistButton logoSize={20} product={product} />
      </div>
    </div>
  );
}
