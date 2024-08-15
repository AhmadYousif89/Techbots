"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Ban, Info, Trash2, Loader, CheckSquare } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { TProduct } from "@/app/products/_lib/types";
import { useCartStore } from "@/app/cart/_store/cart";

import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { extractSearchParams } from "@/app/products/_lib/utils";
import { useIsMounted } from "@/components/hooks/use_isMounted";
import {
  addServerCartItem,
  removeFromServerCart,
} from "@/app/cart/_actions/actions";

type AddToCartButtonProps = {
  product: TProduct;
  forceRedirect?: boolean;
  action?: "addToCart" | "BuyNow";
} & ButtonProps;

export function AddToCartButton({
  action,
  product,
  variant,
  className,
  forceRedirect = false,
  ...props
}: AddToCartButtonProps) {
  const router = useRouter();
  const { userId } = useAuth();
  const params = useSearchParams();
  const sp = extractSearchParams(params.entries());
  const [isPending, startTransition] = useTransition();
  const cart = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  let textContent: React.ReactNode =
    action === "addToCart" ? "Add to cart" : "Buy now";

  const newParams = new URLSearchParams({
    ...(sp.page && { page: sp.page }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.min }),
    ...(sp.grid && { grid: sp.grid }),
  });
  const ps = newParams.toString() ? `&${newParams.toString()}` : "";

  const cartItem = cart.find((item) => item.asin === product.asin);

  const notification = () => (
    <div className="flex items-center gap-4">
      {cartItem ? (
        <Info className="text-blue-400" />
      ) : (
        <CheckSquare className="text-green-400" />
      )}
      <p className="text-sm">Item {cartItem ? "removed" : "added"} to cart</p>
    </div>
  );

  if (useIsMounted() && cartItem)
    textContent = (
      <span title="Delete from cart" className="flex items-center gap-2">
        <Trash2 className="size-5 text-destructive" />
      </span>
    );

  const handleAddToCart = () => {
    if (product.stockQuantity < 1) {
      return toast.error("Product out of stock", {
        icon: <Ban className="text-red-400" />,
      });
    }
    try {
      startTransition(() => {
        product.cartQuantity = 1;
        addToCart(product);
        if (userId) {
          addServerCartItem(userId, product.asin, product.price);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromCart = () => {
    try {
      startTransition(() => {
        removeFromCart(product.asin);
        if (userId) {
          removeFromServerCart(userId, product.asin, product.price);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnClick = () => {
    if (cartItem) handleRemoveFromCart();
    else handleAddToCart();
    if (forceRedirect && !cartItem) router.push(`/cart?${ps}`);
    toast.custom(notification);
  };

  return (
    <>
      {isPending ? (
        <Loader className="mr-2 animate-[spin_2s_linear_infinite] stroke-[3] text-muted-foreground" />
      ) : (
        <Button
          disabled={isPending}
          onClick={handleOnClick}
          variant={variant ? variant : cartItem ? "ghost" : "default"}
          className={cn(
            "text-xs",
            className,
            cartItem ? "aspect-square rounded-full" : "",
          )}
          {...props}
        >
          {textContent}
        </Button>
      )}
    </>
  );
}
