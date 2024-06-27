import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShoppingCart, Slash } from 'lucide-react';

import { CartItem } from './cart_item';
import { ProductType } from '../../../data';
import { useLocalStorage } from '../hooks/use_local_storage';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';
import { Input } from '../ui/input';

export function CartListView({ setNextTab }: { setNextTab: (value: string) => void }) {
  const router = useRouter();
  const [couponValue, setCouponValue] = useState('');
  const [isInvalidCoupon, setIsInvalidCoupon] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart] = useLocalStorage<ProductType[]>('cart', []);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart.length]);

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
        <Slash strokeWidth={1} className='size-64 lg:size-96 m-auto'>
          <ShoppingCart strokeWidth={1} className='text-muted-foreground' />
        </Slash>
      </CardContent>
    );
  } else {
    content = (
      <CardContent className='pt-6 grid lg:grid-cols-2 lg:gap-8 lg:justify-between lg:divide-x'>
        <div className='row-[1]'>
          <CardHeader className='px-0 pt-0'>
            <CardTitle className='text-muted-foreground'>Cart Details</CardTitle>
          </CardHeader>
          <section className='flex flex-col gap-8 divide-y'>
            {cart.map(item => (
              <CartItem key={item.id} product={item} />
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
                    console.log(e.target.value);
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
              <span className='text-sm'>
                ${cart.reduce((acc, item: ProductType) => acc + item.salePrice, 0)}
              </span>
            </div>
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium my-4'>
              <p className='text-sm'>Shipping</p>
              <span className='text-sm'>free</span>
            </div>
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
              <p className='text-sm'>Taxes</p>
              <span className='text-sm'>$10</span>
            </div>
            <Separator className='my-8' />
            <div className='flex items-center justify-between text-muted-foreground uppercase font-semibold text-lg'>
              <p>Total</p>
              <span>
                ${cart.reduce((acc, item: ProductType) => acc + item.salePrice, 0) + 15}
              </span>
            </div>
          </CardContent>
        </section>
      </CardContent>
    );
  }

  return (
    <Card className='py-8 rounded-none min-h-screen grid grid-rows-[1fr,auto]'>
      <>{content}</>
      <CardFooter className='gap-4 justify-end lg:justify-center lg:ml-8 lg:py-8'>
        <Button
          disabled={cartCount == 0}
          className='w-28'
          onClick={() => {
            setNextTab('details');
            router.push('/cart#cart-details');
          }}>
          Next
        </Button>
        <Button
          variant={'outline'}
          className='w-28'
          onClick={() => {
            router.push('/products');
          }}>
          Cancle
        </Button>
      </CardFooter>
    </Card>
  );
}
