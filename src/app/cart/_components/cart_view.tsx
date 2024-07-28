'use client';
import { useEffect, useState } from 'react';
import { RedirectToSignIn, SignIn, useAuth } from '@clerk/nextjs';

import { CartListView } from './cart_list';
import { useCartStore } from '../_store/cart';
import { syncCart } from '../_actions/actions';
import { CartPaymentView } from './cart_payment';
import { CartShippingView } from './cart_shipping';
import { useShippingStore } from '../_store/shipping_form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CartViews() {
  const { userId, isSignedIn } = useAuth();
  const cartItems = useCartStore(s => s.cart);
  const shippingFormState = useShippingStore(s => s.formState());

  useEffect(() => {
    if (userId) {
      syncCart(userId, cartItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length, userId]);

  if (!isSignedIn || !userId)
    return (
      <RedirectToSignIn
        signInForceRedirectUrl={'/cart'}
        signUpForceRedirectUrl={'/cart'}
      />
    );

  return (
    <Tabs defaultValue='cart' orientation='vertical' className='bg-muted pt-10 pb-1'>
      <TabsList className='grid grid-cols-3 rounded-none h-20 pb-0 sm:px-0 sm:gap-8 md:max-w-screen-lg md:mx-auto md:gap-16 lg:max-view'>
        <TabsTrigger
          id='cart-list'
          value='cart'
          className='h-full text-xs sm:text-sm gap-2 rounded-bl-none rounded-br-none data-[state=active]:border-b-2 data-[state=active]:border-primary hover:bg-primary-foreground'>
          <span className='hidden sm:block'>1.</span> Shopping Cart
        </TabsTrigger>

        <TabsTrigger
          id='cart-details'
          value='details'
          disabled={cartItems.length == 0}
          className='h-full text-xs sm:text-sm gap-2 rounded-bl-none rounded-br-none data-[state=active]:border-b-2 data-[state=active]:border-primary hover:bg-primary-foreground'>
          <span className='hidden sm:block'>2.</span> Shipping Details
        </TabsTrigger>

        <TabsTrigger
          id='cart-payment'
          value='payment'
          disabled={!cartItems.length || !userId || shippingFormState.success == false}
          className='h-full text-xs sm:text-sm gap-2 rounded-bl-none rounded-br-none data-[state=active]:border-b-2 data-[state=active]:border-primary hover:bg-primary-foreground'>
          <span className='hidden sm:block'>3.</span> Payment Options
        </TabsTrigger>
      </TabsList>

      <TabsContent value='cart' className='mt-0 mb-1 max-view mx-auto'>
        <CartListView />
      </TabsContent>

      <TabsContent value='details' className='mt-0 mb-1 max-view mx-auto'>
        <CartShippingView />
      </TabsContent>

      <TabsContent value='payment' className='mt-0 mb-1 max-view mx-auto'>
        <CartPaymentView />
      </TabsContent>
    </Tabs>
  );
}
