'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ShoppingCart, Slash } from 'lucide-react';
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
import { Button } from '../ui/button';
import { ProductType } from '../../../data';
import { useMediaQuery } from '../hooks/use_media_query';
import { useLocalStorage } from '../hooks/use_local_storage';
import { Badge } from '../ui/badge';
import { useCartMenuState } from '@/lib/store';
import { ProductThumbnail } from '../products/product_thumpnail';

export function CartMenu() {
  const router = useRouter();
  const { isOpen, setIsOpen } = useCartMenuState();
  const [cartCount, setCartCount] = useState(0);
  const isNotMobile = useMediaQuery('(min-width: 639px');
  const [cartItems] = useLocalStorage<ProductType[]>('cart', []);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems.length]);

  const cartButton = (
    <Button className='relative bg-background text-primary rounded-full hover:bg-background size-8 md:size-9 p-0'>
      <ShoppingBag size={22} />
      <span className='absolute -top-2 -left-2 grid place-content-center rounded-full aspect-square w-5 sm:w-6 h-5 sm:h-6 bg-destructive text-secondary text-xs font-semibold'>
        {cartCount}
      </span>
    </Button>
  );

  const cartMenuButton = (
    <Button
      variant='outline'
      onClick={() => {
        if (cartCount) router.push('/cart');
        setIsOpen(false);
      }}>
      {cartCount == 0 ? 'Close' : 'View My Cart'}
    </Button>
  );

  const cartDescription = (
    <>
      You have
      <Badge variant={'outline'} className='size-8 text-sm justify-center mx-1 shadow-sm'>
        {cartCount > 99 ? '99+' : cartCount}
      </Badge>
      item{cartCount !== 1 ? 's' : ''} in your shopping cart
    </>
  );

  if (isNotMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{cartButton}</SheetTrigger>
        <SheetContent className='grid grid-rows-[auto,1fr,auto]'>
          <SheetHeader className='my-8'>
            <SheetTitle className='flex items-center justify-center gap-4 text-2xl'>
              Cart Items <ShoppingBag />
            </SheetTitle>
            <SheetDescription className='text-center'>{cartDescription}</SheetDescription>
          </SheetHeader>
          {cartCount === 0 ? (
            <section className='grid justify-center items-center'>
              <Slash strokeWidth={1} className='w-64 h-64'>
                <ShoppingCart strokeWidth={1} className='text-muted-foreground' />
              </Slash>
            </section>
          ) : (
            <CartItems />
          )}
          <SheetFooter className='flex gap-4 sm:flex-col sm:space-x-0'>
            <SheetClose asChild>{cartMenuButton}</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{cartButton}</DrawerTrigger>
      <DrawerContent className='space-y-4'>
        <DrawerHeader>
          <DrawerTitle className='flex items-center justify-center gap-4 text-2xl'>
            Cart Items <ShoppingBag />
          </DrawerTitle>
          <DrawerDescription>{cartDescription}</DrawerDescription>
        </DrawerHeader>
        {cartCount === 0 ? (
          <section className='grid justify-center'>
            <Slash strokeWidth={1} className='w-32 h-32'>
              <ShoppingCart strokeWidth={1} className='text-muted-foreground' />
            </Slash>
          </section>
        ) : (
          <CartItems />
        )}
        <DrawerFooter>
          <DrawerClose asChild>{cartMenuButton}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function CartItems() {
  const [cart] = useLocalStorage<ProductType[]>('cart', []);

  return (
    <section className='flex flex-col gap-4 overflow-y-auto py-4 px-4'>
      {cart.map(item => (
        <ProductThumbnail product={item} key={item.id} type='cart' />
      ))}
    </section>
  );
}
