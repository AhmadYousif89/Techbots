'use client';

import { useWishlistMenuState } from '@/lib/store';
import { TProduct } from '@/app/products/_lib/types';
import { Heart, HeartCrack, Info, Trash2 } from 'lucide-react';
import { ProductThumbnail } from '@/app/products/_components/product_thumpnail';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '../ui/sheet';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useMediaQuery } from '../hooks/use_media_query';
import { useLocalStorage } from '../hooks/use_local_storage';
import { useIsMounted } from '../hooks/use_isMounted';
import { ClearWishlistButton } from './clear_button';

export function WishListMenu() {
  const isMounted = useIsMounted();
  const isNotMobile = useMediaQuery('(min-width: 639px');
  const { isOpen, setIsOpen } = useWishlistMenuState();
  const [wishlistItems] = useLocalStorage<TProduct[]>('wishlist', []);

  let wishlistCount = 0;
  if (isMounted()) wishlistCount = wishlistItems.length;

  const WishListButton = (
    <Button className='relative ring-2 ring-input hover:ring-primary size-7 p-1 hover:bg-background transition-all'>
      <Heart className='fill-background stroke-primary' />
      <span className='absolute -top-3 -left-3 grid place-content-center rounded-full aspect-square size-5 bg-destructive ring-1 ring-background text-secondary text-[9px] font-semibold'>
        {wishlistCount > 99 ? '99+' : wishlistCount}
      </span>
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
        <SheetContent className='grid grid-rows-[auto,1fr,auto] min-w-[450px]'>
          <SheetHeader className='mt-8'>
            <SheetTitle className='flex items-center justify-center gap-2 text-xl mb-2'>
              Wishlist <Heart className='size-6 text-destructive' />
            </SheetTitle>
            <SheetDescription className='text-center'>
              {wishlistDescription}
            </SheetDescription>
            {wishlistCount > 0 && <ClearWishlistButton />}
          </SheetHeader>
          {wishlistCount === 0 ? (
            <section className='grid justify-center items-center'>
              <HeartCrack strokeWidth={1} className='w-52 h-52 text-muted-foreground' />
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='flex items-center justify-center gap-2 text-xl mb-2'>
            Wishlist <Heart className='size-5 text-destructive' />
          </DrawerTitle>
          <DrawerDescription className='mb-2'>{wishlistDescription}</DrawerDescription>
          {wishlistCount > 0 && <ClearWishlistButton />}
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

function WishlistItems() {
  const [wishlistItems] = useLocalStorage<TProduct[]>('wishlist', []);

  return (
    <section className='grid sm:flex sm:flex-col gap-4 overflow-auto max-h-96 sm:max-h-screen p-4 sm:px-0'>
      {wishlistItems.map((product, index) => (
        <ProductThumbnail key={index} product={product} type='wishlist' />
      ))}
    </section>
  );
}
