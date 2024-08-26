"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ShoppingCart, Slash } from "lucide-react";
import { useCartMenuState } from "@/app/lib/store";

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
import { TServerCart } from "@/app/(protected)/cart/page";
import { useCartStore } from "@/app/(protected)/cart/_store/cart";
import { useMediaQuery } from "@/app/components/hooks/use_media_query";
import { ProductThumbnail } from "@/app/(public)/products/_components/product_thumpnail";

type CartMenuProps = {
  getServerCart: Promise<TServerCart>;
};

export function CartMenu({ getServerCart }: CartMenuProps) {
  const router = useRouter();
  const serverCart = use(getServerCart);
  const { isOpen, setIsOpen } = useCartMenuState();
  const isNotMobile = useMediaQuery("(min-width: 639px)");
  const cart = useStore(useCartStore, (s) => s.cart) ?? [];
  const cartCount =
    useStore(useCartStore, (s) => s.getTotalCount()) ?? serverCart?.count ?? 0;
  const serverCartItem = serverCart?.cartItems || [];
  const data = serverCartItem.length
    ? serverCartItem.map((i) => i.product)
    : cart;

  const cartButton = (
    <Button className="relative size-7 p-0 ring-2 ring-input transition-all hover:bg-background hover:ring-primary">
      <ShoppingBag size={18} className="fill-background stroke-primary" />
      <span className="absolute -left-3 -top-3 grid aspect-square size-5 place-content-center rounded-full bg-destructive text-[9px] font-semibold text-secondary ring-1 ring-background">
        {cartCount > 99 ? "99+" : cartCount}
      </span>
    </Button>
  );

  const cartMenuButton = (
    <Button
      variant="outline"
      onClick={() => {
        if (cartCount) router.push("/cart");
        setIsOpen(false);
      }}
    >
      {cartCount == 0 ? "Close" : "View My Cart"}
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
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{cartButton}</SheetTrigger>
        <SheetContent className="grid min-w-[450px] grid-rows-[auto,1fr,auto]">
          <SheetHeader className="mt-8">
            <SheetTitle className="flex items-center justify-center gap-4 text-2xl">
              Cart Items <ShoppingBag />
            </SheetTitle>
            <SheetDescription className="text-center">
              {cartDescription}
            </SheetDescription>
            {cartCount > 0 && <ClearCartButton />}
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
              {data.map((item) => (
                <ProductThumbnail product={item} key={item.asin} type="cart" />
              ))}
            </section>
          )}
          <SheetFooter className="flex gap-4 sm:flex-col sm:space-x-0">
            <SheetClose asChild>{cartMenuButton}</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{cartButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="mb-2 flex items-center justify-center gap-2 text-xl">
            Cart Items <ShoppingBag className="size-5" />
          </DrawerTitle>
          <DrawerDescription className="mb-2">
            {cartDescription}
          </DrawerDescription>
          {cartCount > 0 && <ClearCartButton />}
        </DrawerHeader>
        {cartCount === 0 ? (
          <section className="grid justify-center">
            <Slash strokeWidth={1} className="h-32 w-32">
              <ShoppingCart strokeWidth={1} className="text-muted-foreground" />
            </Slash>
          </section>
        ) : (
          <section className="flex max-h-96 flex-col gap-4 overflow-auto px-4 py-4">
            {cart.map((item) => (
              <ProductThumbnail product={item} key={item.asin} type="cart" />
            ))}
          </section>
        )}
        <DrawerFooter>
          <DrawerClose asChild>{cartMenuButton}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
