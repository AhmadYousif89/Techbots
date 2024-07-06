'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Ban, CheckSquare, Info, Trash2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import type { ButtonProps } from '../ui/button';
import { useLocalStorage } from '../hooks/use_local_storage';
import { cn } from '@/lib/utils';

type AddToCartButtonProps = {
  action?: 'addToCart' | 'BuyNow';
  product: Product;
  forceRedirect?: string;
} & ButtonProps;

export function AddToCartButton({
  action,
  product,
  variant,
  className,
  forceRedirect = '',
  ...props
}: AddToCartButtonProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [cart, setCartItem] = useLocalStorage<Product[]>('cart', []);

  let cartItem: Product | undefined;
  let textContent: React.ReactNode = action === 'addToCart' ? 'Add to cart' : 'Buy now';

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (typeof window !== 'undefined') {
    cartItem = cart.find(item => item.asin === product.asin);
  }

  if (isMounted && cartItem)
    textContent = (
      <span title='delete from cart' className='flex items-center gap-2'>
        <Trash2 className='size-5 text-destructive' />
      </span>
    );

  return (
    <Button
      variant={variant ? variant : isMounted && cartItem ? 'ghost' : 'default'}
      className={cn(
        'text-xs',
        className,
        action == 'BuyNow' && cartItem ? 'aspect-square rounded-full' : ''
      )}
      onClick={() => {
        if (cartItem) {
          product.cart_quantity = product.cart_quantity ? product.cart_quantity - 1 : 0;
          setCartItem(cart => cart.filter(i => i.asin !== product.asin));
        } else {
          if (product.stock_quantity < 1 || !product.stock_quantity) {
            return toast.error('Product out of stock', {
              icon: <Ban className='text-red-400' />
            });
          }
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
