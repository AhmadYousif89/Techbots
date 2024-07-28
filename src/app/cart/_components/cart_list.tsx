'use client';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { ShoppingCart, Slash } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import useStore from '@/components/hooks/use-store';

import { CartItem } from './cart_item';
import { useCartStore } from '../_store/cart';
import { DeleteCartItems } from './delete_button';

export function CartListView() {
  const router = useRouter();
  const cart = useStore(useCartStore, s => s.cart) ?? [];
  const VAT = useStore(useCartStore, s => s.getVAT()) ?? 0;
  const total = useStore(useCartStore, s => s.getTotalValue()) ?? 0;
  const cartCount = useStore(useCartStore, s => s.getTotalCount()) ?? 0;
  const coupon = useStore(useCartStore, s => s.coupon) ?? '';
  const setCouponValue = useCartStore(s => s.setCouponValue);
  const couponIsValid = useStore(useCartStore, s => s.couponIsValid());
  const [localCouponValue, setLocalCouponValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  let content;
  if (cartCount === 0) {
    content = (
      <CardContent className='flex flex-col pt-6'>
        <CardHeader>
          <CardTitle className='text-muted-foreground'>Cart Details</CardTitle>
          <CardDescription className='text-xs lg:text-sm'>
            Your cart is empty. Start adding some items to continue.
          </CardDescription>
        </CardHeader>
        <div className='my-10'>
          <Slash
            strokeWidth={1}
            className='size-44 lg:size-56 m-auto text-muted-foreground'>
            <ShoppingCart strokeWidth={1} className='text-muted-foreground/75' />
          </Slash>
        </div>
      </CardContent>
    );
  } else {
    content = (
      <CardContent className='pt-6 grid lg:grid-cols-2 lg:gap-8 lg:justify-between lg:divide-x'>
        <div className='row-[1]'>
          <CardHeader className='px-0 pt-0 flex-row justify-between items-center'>
            <CardTitle className='text-muted-foreground'>Cart Details</CardTitle>
            <DeleteCartItems action='deleteAll' />
          </CardHeader>
          <section className='flex flex-col gap-8 py-4 max-h-[600px] overflow-y-auto'>
            {cart.map(item => (
              <Fragment key={item.id}>
                <CartItem asin={item.asin} />
                <Separator className='last:hidden' />
              </Fragment>
            ))}
          </section>
        </div>

        <Separator className='my-12 col-[1] lg:hidden' />

        <section className='flex flex-col max-w-screen-md lg:row-[1] lg:col-[2] sm:pl-8'>
          <CardHeader className='px-0 pt-0'>
            <CardTitle className='text-muted-foreground'>Summary</CardTitle>
          </CardHeader>

          <Accordion type='single' collapsible className='max-w-xs'>
            <AccordionItem value='coupon'>
              <AccordionTrigger className='text-xs text-muted-foreground underline uppercase hover:text-foreground/50'>
                I have a coupon code
              </AccordionTrigger>
              <AccordionContent className='pr-2'>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setCouponValue?.(localCouponValue);
                    setIsSubmitted(true);
                  }}
                  className='relative flex items-center justify-between gap-4 my-2'>
                  <Input
                    value={localCouponValue}
                    placeholder='Enter coupon code'
                    className='focus-visible:rounded-lg focus-visible:ring-inset'
                    onChange={e => setLocalCouponValue(e.target.value)}
                  />
                  {isSubmitted && !couponIsValid && (
                    <span className='absolute top-10 left-2 text-destructive font-medium text-sm'>
                      Invalid coupon code
                    </span>
                  )}
                  {couponIsValid && (
                    <span className='absolute top-10 left-2 text-green-500 font-medium text-sm'>
                      {coupon.slice(0, 2)}% discount applied
                    </span>
                  )}
                  <Button
                    size={'sm'}
                    disabled={!localCouponValue || coupon === localCouponValue}
                    type='submit'>
                    Apply
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <CardContent className='my-8 px-0 pb-0'>
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
              <p className='text-sm'>Subtotal</p>
              <span className='text-sm'>${total.toFixed(2)}</span>
            </div>
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium my-4'>
              <p className='text-sm'>Shipping</p>
              <span className='text-sm'>free</span>
            </div>
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
              <p className='text-sm'>Taxes</p>
              <span className='text-sm'>${VAT.toFixed(2)}</span>
            </div>
            <Separator className='my-8' />
            <div className='flex items-center justify-between text-muted-foreground uppercase font-semibold text-lg'>
              <p>Total</p>
              <span>${(total + VAT).toFixed(2)}</span>
            </div>
          </CardContent>
        </section>
      </CardContent>
    );
  }

  return (
    <Card className='py-8 rounded-none min-h-screen'>
      <>{content}</>
      <CardFooter className='gap-4 justify-center lg:ml-8 lg:py-8'>
        <Button
          size={'sm'}
          disabled={cartCount == 0}
          className='w-28'
          onClick={() => {
            router.push('/cart#cart-details', { scroll: true });
          }}>
          Next
        </Button>
        <Button
          size={'sm'}
          variant={'outline'}
          className='w-28'
          onClick={() => {
            router.replace(`/products`);
          }}>
          Cancle
        </Button>
      </CardFooter>
    </Card>
  );
}
