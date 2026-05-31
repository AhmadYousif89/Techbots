"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";

import { Info, Loader, Trash2 } from "lucide-react";
import { capitalizeString } from "@/app/lib/utils";
import { setCartMenuOpen, setWishlistMenuOpen } from "@/app/lib/store";

import { TProduct } from "@/app/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/app/lib/utils";
import { TCartProduct } from "@/app/(protected)/cart/page";
import { removeFromServerCart } from "@/app/(protected)/cart/_actions/remove";
import type { TCartStoreItem } from "@/app/(protected)/cart/_store/cart";
import { removeFromCart } from "@/app/(protected)/cart/_store/cart";
import { removeItemFromWishlist } from "../_store/wishlist";

type ProductThumbnailProps = {
  product: TProduct | TCartProduct | TCartStoreItem;
  type: "cart" | "wishlist";
};

export function ProductThumbnail({ product, type }: ProductThumbnailProps) {
  return (
    <Card className="flex items-center gap-2 p-2">
      <Image
        src={product.mainImage}
        alt={product.title}
        width={80}
        height={80}
        className="size-14 object-contain px-2"
      />
      <div className="flex w-full items-center justify-between">
        <CardTitle className="mb-2 flex flex-col text-sm font-medium">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="outline"
              className="py-1 font-semibold text-muted-foreground shadow-sm"
            >
              {capitalizeString(product.category)}
            </Badge>
            <Badge
              variant="outline"
              className="border-0 bg-gradient-to-tl from-primary to-primary/70 py-1 font-semibold text-muted"
            >
              {formatPrice(product.price)}
            </Badge>
          </div>
          <Link
            href={`/products/${product.asin}`}
            className="ml-2 text-xs text-muted-foreground hover:text-blue-500 hover:underline"
            onClick={() => {
              if (type === "cart") setCartMenuOpen(false);
              else setWishlistMenuOpen(false);
            }}
          >
            {product.title.split(" ").slice(0, 6).join(" ")}
          </Link>
        </CardTitle>

        <DeleteThumbnailButton product={product} type={type} />
      </div>
    </Card>
  );
}

function DeleteThumbnailButton({ product, type }: ProductThumbnailProps) {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      if (type === "cart") {
        removeFromCart(product.asin);
        if (userId) {
          try {
            await removeFromServerCart(userId, product.asin, product.price);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        removeItemFromWishlist(product.asin);
      }
      toast.custom(() => {
        return (
          <div className="flex items-center gap-4">
            <Info className="text-blue-500" />
            <p className="text-sm">
              Item removed from {type === "cart" ? "cart" : "wishlist"}
            </p>
          </div>
        );
      });
    });
  };

  return (
    <Button
      variant={"destructive"}
      disabled={isPending}
      title={type === "cart" ? "Remove from cart" : "Remove from wishlist"}
      className="size-6 bg-transparent p-1 hover:bg-destructive/20"
      onClick={() => handleDelete()}
    >
      {isPending ? (
        <Loader className="animate-[spin_2s_linear_infinite] text-muted-foreground" />
      ) : (
        <Trash2 className="text-destructive" />
      )}
    </Button>
  );
}
