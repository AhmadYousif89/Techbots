'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { ShoppingCart, Slash } from 'lucide-react';

import { CartItem } from './cart_item';
import { getCartTotal } from '@/lib/utils';
import { useLocalStorage } from '@/components/hooks/use_local_storage';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { TProduct } from '@/app/products/_lib/types';
import { useIsMounted } from '@/components/hooks/use_isMounted';

export function CartListView({ setNextTab }: { setNextTab: (value: string) => void }) {
  const router = useRouter();
  const params = useSearchParams();
  const [couponValue, setCouponValue] = useState('');
  const [isInvalidCoupon, setIsInvalidCoupon] = useState(false);
  const [cart] = useLocalStorage<TProduct[]>('cart', []);
  const total = getCartTotal(cart);
  const isMounted = useIsMounted();

  let VAT = 0;
  let cartCount = 0;

  if (isMounted()) {
    cartCount = cart.length;
    VAT = +(total * 0.2).toFixed(2);
  }

  useEffect(() => {
    if (couponValue === '50off') {
      setIsInvalidCoupon(false);
    } else {
      setIsInvalidCoupon(true);
    }
  }, [couponValue]);

  let content;
  if (cartCount === 0) {
    content = (
      <CardContent className='flex flex-col pt-6'>
        <CardHeader>
          <CardTitle className='text-muted-foreground'>Cart Details</CardTitle>
          <CardDescription>
            Your cart is empty. Start adding some items to continue.
          </CardDescription>
        </CardHeader>
        <Slash strokeWidth={1} className='size-64 m-auto'>
          <ShoppingCart strokeWidth={1} className='text-muted-foreground' />
        </Slash>
      </CardContent>
    );
  } else {
    content = (
      <CardContent className='pt-6 grid lg:grid-cols-2 lg:gap-8 lg:justify-between lg:divide-x'>
        <div className='row-[1]'>
          <CardHeader className='px-0 pt-0 flex-row justify-between items-center'>
            <CardTitle className='text-muted-foreground'>Cart Details</CardTitle>
            {/* <Button
              variant='secondary'
              className='size-7 p-0 hover:bg-destructive hover:text-secondary'>
              <Trash2 className='size-5' />
            </Button> */}
          </CardHeader>
          <section className='flex flex-col gap-8 '>
            {cart.map((item, index) => (
              <Fragment key={item.asin + index}>
                <CartItem product={item} />
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
              <AccordionContent>
                <Input
                  placeholder='Enter coupon code'
                  className='focus-visible:rounded-none'
                  value={couponValue}
                  onChange={e => {
                    setIsInvalidCoupon(false);
                    setCouponValue(e.target.value);
                  }}
                />
                {isInvalidCoupon &&
                  couponValue?.toLowerCase() !== '50off' &&
                  couponValue.length > 4 && (
                    <span className='text-destructive px-1 mt-2 inline-block font-medium text-xs'>
                      Invalid coupon code
                    </span>
                  )}
                {!isInvalidCoupon && couponValue?.toLowerCase() === '50off' && (
                  <span className='text-green-500 px-1 mt-2 inline-block font-medium text-xs'>
                    50% discount applied
                  </span>
                )}
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
              <span className='text-sm'>${VAT}</span>
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
      <CardFooter className='gap-4 justify-end lg:justify-center lg:ml-8 lg:py-8'>
        <Button
          disabled={cartCount == 0}
          className='w-28'
          onClick={() => {
            setNextTab('details');
            router.push('/cart#cart-details', { scroll: true });
          }}>
          Next
        </Button>
        <Button
          variant={'outline'}
          className='w-28'
          onClick={() => {
            const category = params.get('category') || '';
            const page = params.get('page') || '1';
            const limit = params.get('limit') || '8';
            router.push(`/products?page=${page}&limit=${limit}&cat=${category}`);
          }}>
          Cancle
        </Button>
      </CardFooter>
    </Card>
  );
}
