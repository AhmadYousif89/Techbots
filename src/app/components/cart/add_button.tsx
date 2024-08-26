"use client";

import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { use, useTransition } from "react";
import { Ban, Info, Trash2, Loader, CheckSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { TProduct } from "@/app/lib/types";
import { useCartStore } from "@/app/(protected)/cart/_store/cart";
import { TItemInServerCart } from "@/app/(public)/products/[asin]/page";

import {
  addServerCartItem,
  removeFromServerCart,
} from "@/app/(protected)/cart/_actions/actions";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";

type AddToCartButtonProps = {
  product: TProduct;
  forceRedirect?: boolean;
  action?: "addToCart" | "BuyNow";
  checkItemInServerCart?: Promise<TItemInServerCart>;
} & ButtonProps;

export function AddToCartButton({
  action,
  product,
  variant,
  className,
  checkItemInServerCart,
  forceRedirect = false,
  ...props
}: AddToCartButtonProps) {
  const router = useRouter();
  const { userId } = useAuth();
  const serverItem = checkItemInServerCart
    ? use(checkItemInServerCart)
    : ({} as TItemInServerCart);
  const [isPending, startTransition] = useTransition();
  const cart = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  let textContent: React.ReactNode =
    action === "addToCart" ? "Add to cart" : "Buy now";

  const cartItem =
    serverItem && Object.keys(serverItem).length
      ? serverItem
      : cart.find((item) => item.asin === product.asin);

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

  if (cartItem)
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
    if (forceRedirect && !cartItem) router.push(`/cart`);
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
