'use client';

import { useEffect, useState } from 'react';
import { Heart, HeartCrack } from 'lucide-react';
import { Product } from '@/lib/types';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/drawer';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from '../ui/sheet';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { WishlistItems } from './wishlist_items';
import { useMediaQuery } from '../hooks/use_media_query';
import { useLocalStorage } from '../hooks/use_local_storage';
import { useWishlistMenuState } from '@/lib/store';

export function WishListMenu() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const isNotMobile = useMediaQuery('(min-width: 639px');
  const [wishlistItems, _, removeWishlist] = useLocalStorage<Product[]>('wishlist', []);
  const { isOpen, setIsOpen } = useWishlistMenuState();

  useEffect(() => {
    setWishlistCount(wishlistItems.length);
  }, [wishlistItems]);

  const WishListButton = (
    <Button className='relative ring-1 ring-input rounded-full ring-offset-1 size-7 p-0 hover:bg-background'>
      <Heart size={20} className='fill-background stroke-primary' />
      {/* <span className='absolute -top-2 -left-2 grid place-content-center rounded-full aspect-square size-6 bg-destructive text-secondary text-xs font-semibold'>
        {wishlistCount}
      </span> */}
    </Button>
  );

  const wishlistDescription = (
    <>
      You have
      <Badge variant={'outline'} className='size-8 text-sm justify-center mx-1 shadow-sm'>
        {wishlistCount > 99 ? '99+' : wishlistCount}
      </Badge>
      item{wishlistCount !== 1 ? 's' : ''} in your wishlist
    </>
  );

  if (isNotMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{WishListButton}</SheetTrigger>
        <SheetContent className='grid grid-rows-[auto,1fr,auto]'>
          <SheetHeader className='my-8'>
            <SheetTitle className='flex items-center justify-center gap-2 text-2xl'>
              Wishlist <Heart strokeWidth={3} className='text-destructive' />
            </SheetTitle>
            <SheetDescription className='text-center'>
              {wishlistDescription}
            </SheetDescription>
            {wishlistCount > 0 && (
              <Button
                variant={'link'}
                onClick={() => removeWishlist()}
                className='w-fit self-center'>
                Remove all
              </Button>
            )}
          </SheetHeader>
          {wishlistCount === 0 ? (
            <section className='grid justify-center items-center'>
              <HeartCrack strokeWidth={1} className='w-64 h-64 text-muted-foreground' />
            </section>
          ) : (
            <WishlistItems />
          )}
          <SheetFooter className='mt-auto'>
            <SheetClose asChild>
              <Button variant={'outline'} className='w-full'>
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
      <DrawerContent className='space-y-4'>
        <DrawerHeader>
          <DrawerTitle className='flex items-center justify-center  gap-2 text-2xl'>
            Wishlist <Heart strokeWidth={3} className='text-destructive' />
          </DrawerTitle>
          <DrawerDescription>{wishlistDescription}</DrawerDescription>
        </DrawerHeader>
        {wishlistCount === 0 ? (
          <section className='grid justify-center'>
            <HeartCrack strokeWidth={1} className='w-32 h-32 text-muted-foreground' />
          </section>
        ) : (
          <WishlistItems />
        )}

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
