"use client";

import { use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { TProduct } from "../_lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/cart_menu/add_button";
import { AddToWishlistButton } from "@/components/wishlist_menu/add_button";

type Item = {
  cartId: string;
  quantity: number;
};
type Props = {
  product: TProduct;
  checkCartItem: Promise<Item | null>;
};

export function ProductInteractionButtons({ product, checkCartItem }: Props) {
  const params = useSearchParams();
  const checkItemInCart = use(checkCartItem);

  const inCart = checkItemInCart || params.get("q");

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
            className="h-auto rounded-full py-1 text-xs font-semibold shadow-sm active:translate-y-[1px]"
          >
            <Link href={`/cart?cid=${checkItemInCart?.cartId}`}>
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
