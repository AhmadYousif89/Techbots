'use client';

import { useRouter } from 'next/navigation';
import { useCartMenuState } from '@/lib/store';
import { ShoppingBag, ShoppingCart, Slash } from 'lucide-react';
import { useCartStore } from '../../app/cart/_store/cart';
import useStore from '@/components/hooks/use-store';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/components/hooks/use_media_query';
import { ProductThumbnail } from '../../app/products/_components/product_thumpnail';
import { ClearCartButton } from './clear_button';

export function CartMenu() {
  const router = useRouter();
  const { isOpen, setIsOpen } = useCartMenuState();
  const isNotMobile = useMediaQuery('(min-width: 639px');
  const cart = useStore(useCartStore, s => s.cart) ?? [];
  const cartCount = useStore(useCartStore, s => s.getTotalCount()) ?? 0;

  const cartButton = (
    <Button className='relative ring-2 ring-input hover:ring-primary size-7 p-0 hover:bg-background transition-all'>
      <ShoppingBag size={18} className='fill-background stroke-primary' />
      <span className='absolute -top-3 -left-3 grid place-content-center rounded-full aspect-square size-5 bg-destructive ring-1 ring-background text-secondary text-[9px] font-semibold'>
        {cartCount > 99 ? '99+' : cartCount}
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
        <SheetContent className='grid grid-rows-[auto,1fr,auto] min-w-[450px]'>
          <SheetHeader className='mt-8'>
            <SheetTitle className='flex items-center justify-center gap-4 text-2xl'>
              Cart Items <ShoppingBag />
            </SheetTitle>
            <SheetDescription className='text-center'>{cartDescription}</SheetDescription>
            {cartCount > 0 && <ClearCartButton />}
          </SheetHeader>
          {cartCount === 0 ? (
            <section className='grid justify-center items-center'>
              <Slash strokeWidth={1} className='w-52 h-52'>
                <ShoppingCart strokeWidth={1} className='text-muted-foreground' />
              </Slash>
            </section>
          ) : (
            <section className='flex flex-col gap-4 overflow-auto py-4 px-4'>
              {cart.map(item => (
                <ProductThumbnail product={item} key={item.asin} type='cart' />
              ))}
            </section>
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='flex items-center justify-center gap-2 text-xl mb-2'>
            Cart Items <ShoppingBag className='size-5' />
          </DrawerTitle>
          <DrawerDescription className='mb-2'>{cartDescription}</DrawerDescription>
          {cartCount > 0 && <ClearCartButton />}
        </DrawerHeader>
        {cartCount === 0 ? (
          <section className='grid justify-center'>
            <Slash strokeWidth={1} className='w-32 h-32'>
              <ShoppingCart strokeWidth={1} className='text-muted-foreground' />
            </Slash>
          </section>
        ) : (
          <section className='flex flex-col gap-4 overflow-auto max-h-96 py-4 px-4'>
            {cart.map(item => (
              <ProductThumbnail product={item} key={item.asin} type='cart' />
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
