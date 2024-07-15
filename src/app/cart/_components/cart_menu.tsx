'use client';

import { useRouter } from 'next/navigation';
import { useCartMenuState } from '@/lib/store';
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
} from '@/components/ui/drawer';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TProduct } from '@/app/products/_lib/types';
import { useIsMounted } from '@/components/hooks/use_isMounted';
import { useMediaQuery } from '@/components/hooks/use_media_query';
import { useLocalStorage } from '@/components/hooks/use_local_storage';
import { ProductThumbnail } from '../../products/_components/product_thumpnail';
import { DeleteAllButton } from '@/components/delete_all_button';

export function CartMenu() {
  const router = useRouter();
  const { isOpen, setIsOpen } = useCartMenuState();
  const isNotMobile = useMediaQuery('(min-width: 639px');
  const [cart, setCart, removeCart] = useLocalStorage<TProduct[]>('cart', []);
  const isMounted = useIsMounted();
  let cartCount = 0;

  if (isMounted()) {
    cartCount = cart.length;
  }

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
            {cartCount > 0 && (
              <DeleteAllButton
                title='Delete Cart'
                toastMessage='Your cart is now empty'
                message='All your cart items will be deleted?'
                deleteAction={removeCart}
              />
            )}
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
          {cartCount > 0 && (
            <DeleteAllButton
              title='Delete Cart'
              toastMessage='Your cart is now empty'
              message='All your cart items will be deleted?'
              deleteAction={removeCart}
            />
          )}
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
