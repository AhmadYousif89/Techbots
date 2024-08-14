import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { Info, Trash2 } from "lucide-react";
import { capitalizeString } from "@/app/lib/utils";
import { useCartMenuState, useWishlistMenuState } from "@/app/lib/store";

import { TProduct } from "../_lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/app/cart/_store/cart";
import { removeFromServerCart } from "@/app/cart/_actions/actions";
import { useLocalStorage } from "@/components/hooks/use_local_storage";
import { useWishlistStore } from "@/app/products/_store/wishlist";

type ProductThumbnailProps = {
  product: TProduct;
  type: "cart" | "wishlist";
};

export function ProductThumbnail({ product, type }: ProductThumbnailProps) {
  const { setIsOpen: setIsCartOpen } = useCartMenuState();
  const { setIsOpen: setIsWishlistOpen } = useWishlistMenuState();

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
              className="py-1 font-semibold text-muted-foreground shadow-sm"
            >
              ${product.price.toFixed(2)}
            </Badge>
          </div>
          <Link
            href={`/products/${product.asin}`}
            className="ml-2 text-xs text-muted-foreground hover:text-blue-500 hover:underline"
            onClick={() => {
              if (type === "cart") setIsCartOpen(false);
              else setIsWishlistOpen(false);
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
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const { "1": setStoredItems } = useLocalStorage<TProduct[]>("wishlist", []);
  const { removeItem } = useWishlistStore();

  const handleDelete = () => {
    if (type === "cart") {
      removeFromCart(product.asin);
      if (userId) {
        removeFromServerCart(userId, product.asin, product.price);
      }
    } else {
      // setStoredItems((items) =>
      //   items.filter((item) => item.asin !== product.asin),
      // );
      removeItem(product.asin);
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
  };

  return (
    <Button
      variant={"destructive"}
      title={type === "cart" ? "Remove from cart" : "Remove from wishlist"}
      className="size-6 bg-transparent p-1 hover:bg-destructive/20"
      onClick={() => handleDelete()}
    >
      <Trash2 className="text-destructive" />
    </Button>
  );
}
