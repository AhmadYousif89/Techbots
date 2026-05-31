"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ShoppingCart, Slash } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClearCartButton } from "./clear_button";
import useStore from "@/app/components/hooks/use-store";
import { TServerCart } from "@/app/(protected)/cart/_lib/types";
import { useCartStore } from "@/app/(protected)/cart/_store/cart";
import { useMediaQuery } from "@/app/components/hooks/use_media_query";
import { ProductThumbnail } from "@/app/(public)/products/_components/product_thumpnail";
import { setCartMenuOpen, useMenuStore } from "@/app/lib/store";

type CartMenuProps = {
  getServerCart: Promise<TServerCart>;
};

export function CartMenu({ getServerCart }: CartMenuProps) {
  const router = useRouter();
  const serverCart = use(getServerCart);
  const isNotMobile = useMediaQuery("(min-width: 639px)");

  const isOpen = useMenuStore((state) => state.cartMenuOpen);
  const cart = useStore(useCartStore, (s) => s.cart);
  const cartCount = cart?.length ?? serverCart?.count ?? 0;
  const data = serverCart?.cartItems.length
    ? serverCart?.cartItems.map((i) => i.product)
    : cart;

  const cartButton = (
    <Button className="relative size-7 p-0 ring-1 ring-input transition-all hover:bg-background hover:ring-primary">
      <ShoppingBag size={18} className="fill-background stroke-primary" />
    </Button>
  );

  const cartMenuButton = (
    <Button
      onClick={() => {
        if (cartCount) router.push("/cart");
        setCartMenuOpen(false);
      }}
    >
      {cartCount === 0 ? "Close" : "View My Cart"}
    </Button>
  );

  const cartDescription = (
    <>
      You have
      <Badge
        variant={"outline"}
        className="mx-1 size-8 justify-center text-sm shadow-sm"
      >
        {cartCount > 99 ? "99+" : cartCount}
      </Badge>
      item{cartCount !== 1 ? "s" : ""} in your shopping cart
    </>
  );

  if (isNotMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setCartMenuOpen}>
        <SheetTrigger asChild>{cartButton}</SheetTrigger>
        <SheetContent className="grid min-w-[450px] grid-rows-[auto,1fr,auto]">
          <SheetHeader className="mt-8">
            <SheetTitle className="flex items-center justify-center gap-4 text-2xl">
              Cart Items <ShoppingBag />
            </SheetTitle>
            <SheetDescription className="text-center">
              {cartDescription}
            </SheetDescription>
          </SheetHeader>
          {cartCount === 0 ? (
            <section className="grid items-center justify-center">
              <Slash strokeWidth={1} className="h-52 w-52">
                <ShoppingCart
                  strokeWidth={1}
                  className="text-muted-foreground"
                />
              </Slash>
            </section>
          ) : (
            <section className="flex flex-col gap-4 overflow-auto px-4 py-4">
              {data?.map((item) => (
                <ProductThumbnail product={item} key={item.asin} type="cart" />
              ))}
            </section>
          )}
          <SheetFooter className="flex gap-4 sm:flex-col sm:space-x-0">
            <SheetClose asChild>{cartMenuButton}</SheetClose>
            {cartCount > 0 && <ClearCartButton />}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setCartMenuOpen}>
      <DrawerTrigger asChild>{cartButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="mb-2 flex items-center justify-center gap-2 text-xl">
            Cart Items <ShoppingBag className="size-5" />
          </DrawerTitle>
          <DrawerDescription className="mb-2">
            {cartDescription}
          </DrawerDescription>
        </DrawerHeader>
        {cartCount === 0 ? (
          <section className="grid justify-center">
            <Slash strokeWidth={1} className="h-32 w-32">
              <ShoppingCart strokeWidth={1} className="text-muted-foreground" />
            </Slash>
          </section>
        ) : (
          <section className="flex max-h-96 flex-col gap-4 overflow-auto px-4 py-4">
            {cart?.map((item) => (
              <ProductThumbnail product={item} key={item.asin} type="cart" />
            ))}
          </section>
        )}
        <DrawerFooter>
          {cartCount > 0 && <ClearCartButton />}
          <DrawerClose asChild>{cartMenuButton}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
