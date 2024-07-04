'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckSquare, Info } from 'lucide-react';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import type { ButtonProps } from '../ui/button';
import { useLocalStorage } from '../hooks/use_local_storage';
import { useUser } from '@clerk/nextjs';

type AddToCartButtonProps = {
  action?: 'addToCart' | 'BuyNow';
  product: Product;
  forceRedirect?: string;
} & ButtonProps;

export function AddToCartButton({
  action,
  product,
  variant,
  forceRedirect = '',
  ...props
}: AddToCartButtonProps) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [cart, setCartItem] = useLocalStorage<Product[]>('cart', []);

  let cartItem: Product | undefined;
  let textContent = action === 'addToCart' ? 'Add to cart' : 'Buy now';

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (typeof window !== 'undefined') {
    cartItem = cart.find(item => item.asin === product.asin);
  }

  if (isMounted && cartItem) textContent = 'Remove from cart';

  return (
    <Button
      variant={variant ? variant : isMounted && cartItem ? 'destructive' : 'default'}
      onClick={() => {
        if (cartItem) {
          product.cart_quantity = product.cart_quantity ? product.cart_quantity - 1 : 0;
          setCartItem(cart => cart.filter(i => i.asin !== product.asin));
        } else {
          product.cart_quantity = product.cart_quantity ? product.cart_quantity + 1 : 1;
          setCartItem(cart => [...cart, product]);
        }
        if (forceRedirect && !cartItem) router.push(forceRedirect);
        toast.custom(() => {
          return (
            <div className='flex items-center gap-4'>
              {cartItem ? (
                <Info className='text-blue-400' />
              ) : (
                <CheckSquare className='text-green-400' />
              )}
              <p className='text-sm'>Item {cartItem ? 'removed' : 'added'} to cart</p>
            </div>
          );
        });
      }}
      {...props}>
      {textContent}
    </Button>
  );
}
