"use client";

import { use } from "react";
import { ShoppingBag } from "lucide-react";
import { TItemInServerCart } from "../page";
import { useCartStore } from "@/app/(protected)/cart/_store/cart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type CartIndicatorProps = {
  asin: string;
  checkItemInServerCart: Promise<TItemInServerCart>;
};

export function CartIndicator({
  asin,
  checkItemInServerCart,
}: CartIndicatorProps) {
  const { cart } = useCartStore();
  const serverCartItem = use(checkItemInServerCart);

  const itemInCart = serverCartItem || cart.find((item) => item.asin === asin);

  if (itemInCart)
    return (
      <Popover>
        <PopoverTrigger>
          <ShoppingBag className="size-5 fill-muted" />
        </PopoverTrigger>
        <PopoverContent className="w-fit text-xs text-muted-foreground">
          This item is in your cart
        </PopoverContent>
      </Popover>
    );
}
