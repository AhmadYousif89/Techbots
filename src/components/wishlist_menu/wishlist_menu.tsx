"use client";

import { useWishlistMenuState } from "@/app/lib/store";
import { TProduct } from "@/app/products/_lib/types";
import { Heart, HeartCrack } from "lucide-react";
import { ProductThumbnail } from "@/app/products/_components/product_thumpnail";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useMediaQuery } from "../hooks/use_media_query";
import { useLocalStorage } from "../hooks/use_local_storage";
import { useIsMounted } from "../hooks/use_isMounted";
import { ClearWishlistButton } from "./clear_button";
import { useWishlistStore } from "@/app/products/_store/wishlist";

export function WishListMenu() {
  const isMounted = useIsMounted();
  const isNotMobile = useMediaQuery("(min-width: 639px)");
  const { isOpen, setIsOpen } = useWishlistMenuState();
  // const [wishlistItems] = useLocalStorage<TProduct[]>("wishlist", []);
  const { wishlist } = useWishlistStore();

  let wishlistCount = 0;
  if (isMounted()) wishlistCount = wishlist.length;

  const WishListButton = (
    <Button className="relative size-7 p-1 ring-2 ring-input transition-all hover:bg-background hover:ring-primary">
      <Heart className="fill-background stroke-primary" />
      <span className="absolute -left-3 -top-3 grid aspect-square size-5 place-content-center rounded-full bg-destructive text-[9px] font-semibold text-secondary ring-1 ring-background">
        {wishlistCount > 99 ? "99+" : wishlistCount}
      </span>
    </Button>
  );

  const wishlistDescription = (
    <>
      You have
      <Badge
        variant={"outline"}
        className="mx-1 size-8 justify-center text-sm shadow-sm"
      >
        {wishlistCount > 99 ? "99+" : wishlistCount}
      </Badge>
      item{wishlistCount !== 1 ? "s" : ""} in your wishlist
    </>
  );

  if (isNotMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{WishListButton}</SheetTrigger>
        <SheetContent className="grid min-w-[450px] grid-rows-[auto,1fr,auto]">
          <SheetHeader className="mt-8">
            <SheetTitle className="mb-2 flex items-center justify-center gap-2 text-xl">
              Wishlist <Heart className="size-6 text-destructive" />
            </SheetTitle>
            <SheetDescription className="text-center">
              {wishlistDescription}
            </SheetDescription>
            {wishlistCount > 0 && <ClearWishlistButton />}
          </SheetHeader>
          {wishlistCount === 0 ? (
            <section className="grid items-center justify-center">
              <HeartCrack
                strokeWidth={1}
                className="h-52 w-52 text-muted-foreground"
              />
            </section>
          ) : (
            <WishlistItems />
          )}
          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button variant={"outline"} className="w-full">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{WishListButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="mb-2 flex items-center justify-center gap-2 text-xl">
            Wishlist <Heart className="size-5 text-destructive" />
          </DrawerTitle>
          <DrawerDescription className="mb-2">
            {wishlistDescription}
          </DrawerDescription>
          {wishlistCount > 0 && <ClearWishlistButton />}
        </DrawerHeader>
        {wishlistCount === 0 ? (
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
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function WishlistItems() {
  // const [wishlistItems] = useLocalStorage<TProduct[]>("wishlist", []);
  const { wishlist } = useWishlistStore();

  return (
    <section className="grid max-h-96 gap-4 overflow-auto p-4 sm:flex sm:max-h-screen sm:flex-col sm:px-0">
      {wishlist.map((product, index) => (
        <ProductThumbnail key={index} product={product} type="wishlist" />
      ))}
    </section>
  );
}
