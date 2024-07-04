'use client';

import { Product } from '@/lib/types';
import { SignInButton, useUser } from '@clerk/nextjs';
import { useLocalStorage } from '../hooks/use_local_storage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type BuyNowButtonProps = {
  product: Product;
};

export function BuyNowButton({ product }: BuyNowButtonProps) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [_, setCartItem] = useLocalStorage<Product[]>('cart', []);
  const [buyNowClicked, setBuyNowClicked] = useState(false);

  useEffect(() => {
    if (isSignedIn && buyNowClicked) {
      product.cart_quantity = product.cart_quantity ? product.cart_quantity + 1 : 1;
      setCartItem(cart => {
        if (cart.find(i => i.asin === product.asin)) return cart;
        return [...cart, product];
      });
      router.push('/cart');
    }
  }, [isSignedIn, setCartItem, buyNowClicked]);

  return (
    <div
      className='inline-flex items-center justify-center border whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent text-primary hover:bg-secondary/90 h-10 w-20 text-xs *:h-full *:w-full'
      onClick={() => setBuyNowClicked(true)}>
      <SignInButton fallbackRedirectUrl={'/products'} mode='modal'>
        Buy now
      </SignInButton>
    </div>
  );
}
