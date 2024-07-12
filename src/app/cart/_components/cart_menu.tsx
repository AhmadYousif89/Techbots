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
import { Product } from '@/app/products/_actions/actions';
import { useIsMounted } from '@/components/hooks/use_isMounted';
import { useMediaQuery } from '@/components/hooks/use_media_query';
import { useLocalStorage } from '@/components/hooks/use_local_storage';
import { ProductThumbnail } from '../../products/_components/product_thumpnail';

export function CartMenu() {
  const router = useRouter();
  const { isOpen, setIsOpen } = useCartMenuState();
  const isNotMobile = useMediaQuery('(min-width: 639px');
  const [cart, setCart, removeCart] = useLocalStorage<Product[]>('cart', []);
  const isMounted = useIsMounted();
  let cartCount = 0;

  if (isMounted()) {
    cartCount = cart.length;
  }

  const cartButton = (
    <Button className='relative ring-1 ring-input rounded-full ring-offset-1 size-7 p-0 hover:bg-background'>
      <ShoppingBag size={18} className='fill-background stroke-primary' />
      <span className='absolute -top-3 -left-3 grid place-content-center rounded-full aspect-square size-5 bg-destructive ring-1 ring-background text-secondary text-xs font-semibold'>
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

  const deleteAllButton = (
    <Button
      variant={'link'}
      onClick={() => removeCart()}
      className='w-full py-1 pb-2 px-3 mb-2 h-auto rounded self-center text-destructive hover:bg-destructive/20'>
      Delete all
    </Button>
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
            {cartCount > 0 && deleteAllButton}
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
      <DrawerContent className='max-w-[450px] mx-auto px-4'>
        <DrawerHeader>
          <DrawerTitle className='flex items-center justify-center gap-4 text-xl mb-2'>
            Cart Items <ShoppingBag className='size-5' />
          </DrawerTitle>
          <DrawerDescription>{cartDescription}</DrawerDescription>
        </DrawerHeader>
        {cartCount > 0 && deleteAllButton}
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
