'use client';

import { useState } from 'react';
import { CartPaymentView } from './cart_payment';
import { CartShippingView } from './cart_shipping';
import { CartListView } from './cart_list';
import { useLocalStorage } from '../hooks/use_local_storage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function CartTabs() {
  const [tabValue, setTabValue] = useState('cart');
  const [cartItems] = useLocalStorage('cart', []);
  let tabIsDisabled = false;

  const onTabChange = (value: string) => setTabValue(value);

  if (typeof window !== 'undefined') {
    tabIsDisabled = cartItems.length === 0;
  }

  return (
    <Tabs
      value={tabValue}
      defaultValue='cart'
      orientation='vertical'
      onValueChange={onTabChange}
      className='bg-muted pt-10 pb-1'>
      <TabsList className='grid grid-cols-3 rounded-none h-20 pb-0 sm:px-0 sm:gap-8 md:max-w-screen-lg md:mx-auto md:gap-16 lg:max-w-screen-xl'>
        <TabsTrigger
          id='cart-items'
          value='cart'
          className='h-full gap-2 rounded-bl-none rounded-br-none data-[state=active]:border-b-2 data-[state=active]:border-primary hover:bg-primary-foreground'>
          <span className='hidden sm:block'>1.</span> Shopping Cart
        </TabsTrigger>

        <TabsTrigger
          id='cart-details'
          value='details'
          disabled={tabIsDisabled}
          className='h-full gap-2 rounded-bl-none rounded-br-none data-[state=active]:border-b-2 data-[state=active]:border-primary hover:bg-primary-foreground'>
          <span className='hidden sm:block'>2.</span> Shipping Details
        </TabsTrigger>

        <TabsTrigger
          id='cart-payment'
          value='payment'
          disabled={tabIsDisabled}
          className='h-full gap-2 rounded-bl-none rounded-br-none data-[state=active]:border-b-2 data-[state=active]:border-primary hover:bg-primary-foreground'>
          <span className='hidden sm:block'>3.</span> Payment Options
        </TabsTrigger>
      </TabsList>

      <TabsContent value='cart' className='mt-0 mb-1 max-w-screen-xl mx-auto'>
        <CartListView setNextTab={setTabValue} />
      </TabsContent>

      <TabsContent value='details' className='mt-0 mb-1 max-w-screen-xl mx-auto'>
        <CartShippingView />
      </TabsContent>

      <TabsContent value='payment' className='mt-0 mb-1 max-w-screen-xl mx-auto'>
        <CartPaymentView />
      </TabsContent>
    </Tabs>
  );
}
