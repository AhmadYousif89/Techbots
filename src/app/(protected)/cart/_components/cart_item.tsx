"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { Minus, Plus } from "lucide-react";

import { useCartStore } from "../_store/cart";
import { DeleteCartItems } from "./delete_button";
import {
  decrementServerCartItem,
  incrementServerCartItem,
} from "../_actions/actions";
import { TCartProduct } from "../page";
import { TProduct } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import useStore from "@/app/components/hooks/use-store";
import { Badge } from "@/components/ui/badge";

type CartItemProps = {
  asin: string;
  serverItem: TCartProduct | undefined;
  serverItemQuantity: number | undefined;
};

export function CartItem({
  asin,
  serverItem,
  serverItemQuantity,
}: CartItemProps) {
  const { userId } = useAuth();
  const cart = useStore(useCartStore, (s) => s.cart) ?? [];
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);

  const item = serverItem ?? cart.find((item) => item.asin === asin);
  const cartQuantity = serverItemQuantity ?? (item as TProduct)?.cartQuantity;

  if (!item) {
    return null;
  }

  const handleItemQuantity = async (action: "increment" | "decrement") => {
    if (action === "increment") {
      increaseQuantity?.(item.asin);
      if (userId) {
        try {
          await incrementServerCartItem(userId, item.asin, item.price);
        } catch (error) {
          console.error("Error updating cart item:", error);
        }
      }
    } else {
      decreaseQuantity?.(item.asin);
      if (userId) {
        try {
          await decrementServerCartItem(userId, item.asin, item.price);
        } catch (error) {
          console.error("Error updating cart item:", error);
        }
      }
    }
  };

  return (
    <div className="mt-4 flex max-w-xl gap-8 even:pt-8">
      <Card className="grid aspect-square w-full max-w-16 place-content-center self-start rounded shadow-sm">
        <Image
          title={asin}
          src={item.mainImage}
          alt={item.title}
          width={100}
          height={100}
          className="size-14 object-contain"
        />
      </Card>

      <div>
        <div className="mb-2 flex gap-2">
          <Badge
            variant={"outline"}
            className="border-0 bg-emerald-500 text-secondary shadow-sm"
          >
            On Sale
          </Badge>
          <Badge
            className="py-1 text-muted-foreground shadow-sm"
            variant={"outline"}
          >
            {item.price.toFixed(2)}
          </Badge>
        </div>
        <Link href={`/products/${item.asin}`} className="group">
          <CardTitle className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-muted-foreground/80 group-hover:underline sm:text-sm">
            {item.title}
          </CardTitle>
        </Link>

        <div className="mt-6 flex items-center gap-4">
          <Button
            disabled={cartQuantity === item.stockQuantity}
            variant="outline"
            className="size-7 p-1"
            onClick={() => handleItemQuantity("increment")}
          >
            <Plus />
          </Button>
          <Badge
            variant={"outline"}
            className="inline-grid h-8 w-20 place-content-center p-2 shadow-sm"
          >
            {cartQuantity} / {item.stockQuantity}
          </Badge>
          {cartQuantity > 1 ? (
            <Button
              size="icon"
              variant="outline"
              className="size-7 p-1"
              onClick={() => handleItemQuantity("decrement")}
            >
              <Minus />
            </Button>
          ) : (
            <DeleteCartItems
              action="deleteOne"
              asin={item.asin}
              price={item.price}
            />
          )}
        </div>
      </div>
    </div>
  );
}
