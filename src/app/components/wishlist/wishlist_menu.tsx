"use client";

import { Heart, HeartCrack } from "lucide-react";

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
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClearWishlistButton } from "./clear_button";
import { useMediaQuery } from "../hooks/use_media_query";
import { useWishlistStore } from "@/app/(public)/products/_store/wishlist";
import { ProductThumbnail } from "@/app/(public)/products/_components/product_thumpnail";
import useStore from "../hooks/use-store";
import { setWishlistMenuOpen, useMenuStore } from "@/app/lib/store";

export function WishListMenu() {
  const isNotMobile = useMediaQuery("(min-width: 639px)");
  const isOpen = useMenuStore((state) => state.wishlistMenuOpen);
  const wishlist = useStore(useWishlistStore, (state) => state.wishlist);
  const count = wishlist?.length ?? 0;

  const WishListButton = (
    <Button className="relative size-7 p-1 ring-1 ring-input transition-all hover:bg-background hover:ring-primary">
      <Heart className="fill-background stroke-primary" />
    </Button>
  );

  const wishlistDescription = (
    <>
      You have
      <Badge
        variant={"outline"}
        className="mx-1 size-8 justify-center text-sm shadow-sm"
      >
        {count > 99 ? "99+" : count}
      </Badge>
      item{count !== 1 ? "s" : ""} in your wishlist
    </>
  );

  if (isNotMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setWishlistMenuOpen}>
        <SheetTrigger asChild>{WishListButton}</SheetTrigger>
        <SheetContent className="grid min-w-[450px] grid-rows-[auto,1fr,auto]">
          <SheetHeader className="mt-8">
            <SheetTitle className="mb-2 flex items-center justify-center gap-2 text-xl">
              Wishlist <Heart className="size-6 text-destructive" />
            </SheetTitle>
            <SheetDescription className="text-center">
              {wishlistDescription}
            </SheetDescription>
          </SheetHeader>
          {count === 0 ? (
            <section className="grid items-center justify-center">
              <HeartCrack
                strokeWidth={1}
                className="h-52 w-52 text-muted-foreground"
              />
            </section>
          ) : (
            <WishlistItems />
          )}
          <SheetFooter className="gap-4 sm:flex-col sm:space-x-0">
            {count > 0 && <ClearWishlistButton />}
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setWishlistMenuOpen}>
      <DrawerTrigger asChild>{WishListButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="mb-2 flex items-center justify-center gap-2 text-xl">
            Wishlist <Heart className="size-5 text-destructive" />
          </DrawerTitle>
          <DrawerDescription className="mb-2">
            {wishlistDescription}
          </DrawerDescription>
        </DrawerHeader>
        {count === 0 ? (
          <section className="grid justify-center">
            <HeartCrack
              strokeWidth={1}
              className="h-32 w-32 text-muted-foreground"
            />
          </section>
        ) : (
          <WishlistItems />
        )}

        <DrawerFooter>
          {count > 0 && <ClearWishlistButton />}
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function WishlistItems() {
  const wishlist = useStore(useWishlistStore, (state) => state.wishlist) ?? [];

  return (
    <section className="grid max-h-96 gap-4 overflow-auto p-4 sm:flex sm:max-h-screen sm:flex-col sm:px-0">
      {wishlist.map((product, index) => (
        <ProductThumbnail key={index} product={product} type="wishlist" />
      ))}
    </section>
  );
}
