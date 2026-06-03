"use client";

import Link from "next/link";
import { Image } from "@unpic/react";
import { useAuth } from "@clerk/nextjs";
import { Minus, Plus } from "lucide-react";

import { TCartProduct } from "../_lib/types";
import { DeleteCartItems } from "./delete_button";
import { incrementServerCartItem } from "../_actions/increment";
import { decrementServerCartItem } from "../_actions/decrement";
import { Button } from "@/components/ui/button";
import useStore from "@/app/components/hooks/use-store";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/app/lib/utils";
import {
  useCartStore,
  decreaseQuantity,
  increaseQuantity,
  type TCartStoreItem,
} from "../_store/cart";

type CartItemProps = {
  asin: string;
  serverItem: TCartProduct | TCartStoreItem | undefined;
  serverItemQuantity: number | undefined;
};

export function CartItem({
  asin,
  serverItem,
  serverItemQuantity,
}: CartItemProps) {
  const { userId } = useAuth();
  const cart = useStore(useCartStore, (s) => s.cart) ?? [];

  const item = serverItem ?? cart.find((item) => item.asin === asin);
  const cartQuantity =
    serverItemQuantity ??
    (item && "cartQuantity" in item ? item.cartQuantity : 0);

  if (!item) {
    return null;
  }

  const handleItemQuantity = async (action: "increment" | "decrement") => {
    if (action === "increment") {
      increaseQuantity(item.asin);
      if (userId) {
        try {
          await incrementServerCartItem(userId, item.asin, item.price);
        } catch (error) {
          console.error("Error updating cart item:", error);
        }
      }
    } else {
      decreaseQuantity(item.asin);
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
    <article className="rounded-md border p-2 shadow-sm">
      <div className="mb-2 flex gap-2.5">
        <Badge
          variant={"outline"}
          className="border-0 bg-emerald-500 text-secondary"
        >
          On Sale
        </Badge>
        <Badge className="text-muted-foreground" variant={"outline"}>
          {formatPrice(item.price)}
        </Badge>
      </div>

      <div className="m-1 flex items-center gap-4 rounded">
        <Image
          title={asin}
          src={item.mainImage}
          alt={item.title}
          width={100}
          height={100}
          className="aspect-square w-14 object-cover object-center"
        />
        <Link href={`/products/${item.asin}`} className="group">
          <p className="text-pretty text-xs font-medium text-muted-foreground transition-colors group-hover:text-muted-foreground/80 group-hover:underline sm:text-sm/tight">
            {item.title}
          </p>
        </Link>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          disabled={cartQuantity === item.stockQuantity}
          variant="outline"
          className="size-7 p-1"
          onClick={() => handleItemQuantity("increment")}
        >
          <Plus className="size-4" />
        </Button>
        <Badge
          variant={"outline"}
          className="inline-grid h-6 w-20 justify-center"
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
    </article>
  );
}
