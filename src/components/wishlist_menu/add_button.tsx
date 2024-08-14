"use client";

import { toast } from "sonner";
import { cn } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { Heart, Info } from "lucide-react";
import { TProduct } from "@/app/products/_lib/types";

import { Button } from "../ui/button";
import { useLocalStorage } from "../hooks/use_local_storage";
import { useWishlistStore } from "@/app/products/_store/wishlist";

type AddToWishlistButtonProps = {
  product: TProduct;
  className?: string;
  logoSize?: number;
};

export function AddToWishlistButton({
  product,
  className,
  logoSize = 24,
}: AddToWishlistButtonProps) {
  const [item, setItem] = useState("");
  // const [wishlist, setWishlist] = useLocalStorage<TProduct[]>("wishlist", []);
  const { wishlist, addItem, removeItem } = useWishlistStore();

  const wishItem = wishlist.find(
    (item: TProduct) => item.asin === product.asin,
  );

  useEffect(() => {
    if (wishItem) {
      setItem(wishItem.asin);
    } else {
      setItem("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist.length, wishItem?.asin, product.asin]);

  return (
    <Button
      variant="ghost"
      title={item ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(className, "aspect-square rounded-full p-0")}
      onClick={() => {
        toast.custom(() => {
          if (item) {
            setItem("");
            removeItem(product.asin);
            return (
              <div className="flex items-center gap-4">
                <Info className="text-blue-400" />
                <p className="text-sm">Item removed from wishlist</p>
              </div>
            );
          }
          addItem(product);
          return (
            <div className="flex items-center gap-4">
              <Heart className="text-green-400" />
              <p className="text-sm">Item added to wishlist</p>
            </div>
          );
        });
      }}
    >
      <Heart
        size={logoSize}
        className={cn("text-destructive", item && "fill-destructive")}
      />
    </Button>
  );
}
