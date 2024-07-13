'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TProduct } from '@/app/products/_lib/types';
import { getCartCount, getCartTotal } from '@/lib/utils';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLocalStorage } from '@/components/hooks/use_local_storage';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useShippingFormStore } from '../_store/shipping_form';
import { useAuth } from '@clerk/nextjs';
import { useIsMounted } from '@/components/hooks/use_isMounted';

type ShippingType = 'free' | 'next';

const validate = z.string().min(1, { message: 'Field is required' });
// .refine(value => !value.startsWith(' '), { message: 'Field start with empty spaces' });

const shippingSchema = z.object({
  firstname: validate,
  lastname: validate,
  mainAddress: validate,
  optionalAddress: z.string().optional(),
  city: validate,
  phone: z
    .number({ coerce: true, message: 'Invalid phone number' })
    .min(1, { message: 'Field is required' }),
  shipping: z.union([z.literal('free'), z.literal('next')])
});

export type ShippingForm = z.infer<typeof shippingSchema>;

const initTouchState = {
  firstname: false,
  lastname: false,
  mainAddress: false,
  optionalAddress: false,
  city: false,
  phone: false,
  shipping: false
};

export type Order = {
  id: string;
  userId: string;
  items: Partial<TProduct>[]; //  { asin: BSKXOZA23, quantity: 1 }
  shippingInfo: ShippingForm;
  total: number;
};
type ShippingFormKeys = keyof ShippingForm;

export function CartShippingView() {
  const router = useRouter();
  const { userId } = useAuth();
  const [cart, setCart] = useLocalStorage<TProduct[]>('cart', []);
  const [hasOrder, setHasOrder] = useLocalStorage('hasOrder', false);
  const { data, setFormData } = useShippingFormStore();
  const [touchState, setTouchState] =
    useState<Record<ShippingFormKeys, boolean>>(initTouchState);
  const isMounted = useIsMounted();
  const total = getCartTotal(cart);
  const itemsCount = getCartCount(cart);
  let VAT = 0;

  if (isMounted()) {
    VAT = +(total * 0.2).toFixed(2);
  }

  const onFirstNameChange = (value: string, name: ShippingFormKeys) => {
    setFormData({ ...data, firstname: value.trim() });
    setTouchState({ ...touchState, firstname: true });
  };
  const onLastNameChange = (value: string, name: ShippingFormKeys) => {
    setFormData({ ...data, lastname: value.trim() });
    setTouchState({ ...touchState, lastname: true });
  };
  const onMainAddressChange = (value: string, name: ShippingFormKeys) => {
    setFormData({ ...data, mainAddress: value.trim() });
    setTouchState({ ...touchState, mainAddress: true });
  };
  const onOptionalAddressChange = (value: string, name: ShippingFormKeys) => {
    setFormData({ ...data, optionalAddress: value.trim() });
    setTouchState({ ...touchState, optionalAddress: true });
  };
  const onCityChange = (value: string, name: ShippingFormKeys) => {
    setFormData({ ...data, city: value.trim() });
    setTouchState({ ...touchState, city: true });
  };
  const onPhoneChange = (value: number, name: ShippingFormKeys) => {
    setFormData({ ...data, phone: value });
    setTouchState({ ...touchState, phone: true });
  };
  const onShippingChange = (value: ShippingType) => {
    setFormData({ ...data, shipping: value });
  };

  const formResult = shippingSchema.safeParse(data);
  let errors: {
    firstname?: string[] | undefined;
    lastname?: string[] | undefined;
    mainAddress?: string[] | undefined;
    optionalAddress?: string[] | undefined;
    city?: string[] | undefined;
    phone?: string[] | undefined;
    shipping?: string[] | undefined;
  } = {};
  if (formResult.success == false) {
    errors = formResult.error.formErrors.fieldErrors;
  }

  return (
    <Card className='rounded-none py-8 min-h-screen'>
      <CardContent className='grid gap-8 max-w-screen-md lg:grid-cols-2 lg:divide-x lg:justify-between lg:max-w-screen-xl'>
        <CardHeader className='px-0'>
          <CardTitle className='text-muted-foreground pb-8'>
            Shipping Information
          </CardTitle>
          <form className='grid gap-8 lg:col-[1]'>
            <fieldset className='flex items-center *:flex-1 gap-4'>
              <div className='relative'>
                <Input
                  defaultValue={data.firstname}
                  placeholder='First Name'
                  name='firstname'
                  onChange={e =>
                    onFirstNameChange(e.target.value, e.target.name as ShippingFormKeys)
                  }
                />
                {errors.firstname && touchState.firstname && (
                  <span className='absolute left-2 -bottom-5 text-destructive text-xs w-full'>
                    {errors.firstname}
                  </span>
                )}
              </div>
              <div className='relative'>
                <Input
                  defaultValue={data.lastname}
                  placeholder='Last Name'
                  name='lastname'
                  onChange={e =>
                    onLastNameChange(e.target.value, e.target.name as ShippingFormKeys)
                  }
                />
                {errors.lastname && touchState.lastname && (
                  <span className='absolute left-2 -bottom-5 text-destructive text-xs'>
                    {errors.lastname}
                  </span>
                )}
              </div>
            </fieldset>
            <fieldset className='space-y-8'>
              <div className='relative'>
                <Input
                  defaultValue={data.mainAddress}
                  placeholder='Main Address'
                  name='main-address'
                  onChange={e =>
                    onMainAddressChange(e.target.value, e.target.name as ShippingFormKeys)
                  }
                />
                {errors.mainAddress && touchState.mainAddress && (
                  <span className='absolute left-2 -bottom-5 text-destructive text-xs'>
                    {errors.mainAddress}
                  </span>
                )}
              </div>
              <Input
                defaultValue={data.optionalAddress}
                placeholder='Optional Address'
                name='optional-address'
                required={false}
                onChange={e =>
                  onOptionalAddressChange(
                    e.target.value,
                    e.target.name as ShippingFormKeys
                  )
                }
              />
            </fieldset>
            <fieldset className='grid grid-cols-2 gap-4 items-center'>
              <div className='relative'>
                <Input
                  defaultValue={data.city}
                  placeholder='City'
                  type='text'
                  name='city'
                  onChange={e =>
                    onCityChange(e.target.value, e.target.name as ShippingFormKeys)
                  }
                />
                {errors.city && touchState.city && (
                  <span className='absolute left-2 -bottom-5 text-destructive text-xs'>
                    {errors.city}
                  </span>
                )}
              </div>
              <div className='relative'>
                <Input
                  defaultValue={data.phone}
                  placeholder='Phone'
                  type='number'
                  name='phone'
                  onChange={e =>
                    onPhoneChange(
                      e.target.valueAsNumber,
                      e.target.name as ShippingFormKeys
                    )
                  }
                />
                {errors.phone && touchState.phone && (
                  <span className='absolute left-2 -bottom-5 text-destructive text-xs'>
                    {errors.phone}
                  </span>
                )}
              </div>
            </fieldset>

            <Separator />

            <RadioGroup
              name='shipping'
              defaultValue={data.shipping}
              value={data.shipping}
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
              <span>{itemsCount}</span>
            </div>
            <Separator className='my-8' />
            {/* Subtotal */}
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
              <p className='text-sm'>Subtotal</p>
              <span className='text-sm'>${total.toFixed(2)}</span>
            </div>
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium my-4'>
              <p className='text-sm'>Shipping</p>
              <span className='text-sm'>{data.shipping === 'next' ? '$20' : 'Free'}</span>
            </div>
            <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
              <p className='text-sm'>Taxes</p>
              <span className='text-sm'>${VAT}</span>
            </div>
            <Separator className='my-8' />
            <div className='flex items-center justify-between text-muted-foreground uppercase font-semibold text-lg'>
              <p>Total</p>
              <span>
                ${(total + VAT + (data.shipping === 'next' ? 20 : 0)).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </section>
      </CardContent>
      <CardFooter className='gap-4 justify-end lg:justify-center lg:py-8'>
        <Button
          disabled={formResult.success === false}
          onClick={() => {
            if (!userId) return router.push('/sign-in');
            setHasOrder(true);
            router.push('/cart?fr=success#cart-payment');
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
