import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useLocalStorage } from '../hooks/use_local_storage';
import { Product } from '@/lib/types';
import { getCartTotal } from '@/lib/utils';

type ShippingType = 'free' | 'next';

export function CartShippingView() {
  const router = useRouter();
  const [shippingValue, setShippingValue] = useState<ShippingType>('free');
  const [cart] = useLocalStorage<Product[]>('cart', []);
  const VAT = 10;
  const total = getCartTotal(cart);

  const onShippingChange = (value: ShippingType) => setShippingValue(value);

  return (
    <Card className='rounded-none py-8 min-h-screen'>
      <CardContent className='grid gap-8 max-w-screen-md lg:grid-cols-2 lg:divide-x lg:justify-between lg:max-w-screen-xl'>
        <CardHeader className='px-0'>
          <CardTitle className='text-muted-foreground pb-8'>
            Shipping Information
          </CardTitle>
          <form className='grid gap-8 lg:col-[1]'>
            <fieldset className='flex items-center gap-4'>
              <Input placeholder='First Name' />
              <Input placeholder='Last Name' />
            </fieldset>
            <fieldset className='space-y-6'>
              <Input placeholder='Address 1' />
              <Input placeholder='Address 2' />
            </fieldset>
            <fieldset className='grid grid-cols-2 gap-4 items-center'>
              <Input placeholder='City' type='text' />
              <Input placeholder='Phone' type='number' className='appearance-none' />
            </fieldset>

            <Separator />

            <RadioGroup
              defaultValue='free'
              value={shippingValue}
              onValueChange={onShippingChange}
              className='flex flex-wrap gap-4'>
              <Label
                htmlFor='r1'
                className='flex items-center gap-4 p-4 min-w-56 rounded-lg bg-muted text-sm cursor-pointer hover:bg-foreground/5 shadow-sm'>
                <RadioGroupItem id='r1' value='free' />
                <div className='space-y-1'>
                  <p className='text-xs font-medium'>Free Shipping</p>
                  <p className='text-xs text-muted-foreground'>
                    Between 2-5 working days
                  </p>
                </div>
              </Label>

              <Label
                htmlFor='r2'
                className='flex items-center gap-4 p-4 min-w-56 rounded-lg bg-muted text-sm cursor-pointer hover:bg-foreground/5 shadow-sm'>
                <RadioGroupItem value='next' id='r2' />
                <div className='space-y-1'>
                  <p className='text-xs font-medium'>Next Day Shipping - $20</p>
                  <p className='text-xs text-muted-foreground'>24 hour from checkout</p>
                </div>
              </Label>
            </RadioGroup>
          </form>
        </CardHeader>

        <Separator className='lg:hidden' />

        <section className='flex flex-col max-w-screen-md lg:pl-8 lg:pt-6'>
          <CardHeader className='px-0 pt-0 pb-8'>
            <CardTitle className='text-muted-foreground'>Summary</CardTitle>
          </CardHeader>

          <CardContent className='mb-8 px-0 pb-0'>
            {/* Cart items */}
            <div className='flex items-center justify-between text-sm text-muted-foreground uppercase font-medium'>
              <p>Items</p>
              <span>{cart.length}</span>
            </div>
            <Separator className='my-8' />
            {/* Subtotal */}
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
              <p className='text-sm'>Subtotal</p>
              <span className='text-sm'>${total}</span>
            </div>
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium my-4'>
              <p className='text-sm'>Shipping</p>
              <span className='text-sm'>{shippingValue === 'next' ? '$20' : 'Free'}</span>
            </div>
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
              <p className='text-sm'>Taxes</p>
              <span className='text-sm'>${VAT}</span>
            </div>
            <Separator className='my-8' />
            <div className='flex items-center justify-between text-muted-foreground uppercase font-semibold text-lg'>
              <p>Total</p>
              <span>
                ${(total + VAT + (shippingValue === 'next' ? 20 : 0)).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </section>
      </CardContent>
      <CardFooter className='gap-4 justify-end lg:justify-center lg:py-8'>
        <Button
          onClick={() => {
            router.push('/cart#cart-payment', { scroll: true });
          }}>
          Add your payment
        </Button>
        <Button
          variant={'outline'}
          className='w-28'
          onClick={() => {
            router.push('/cart#cart-list', { scroll: true });
          }}>
          Back
        </Button>
      </CardFooter>
    </Card>
  );
}
