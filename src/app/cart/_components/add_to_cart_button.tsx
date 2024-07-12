'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Ban, CheckSquare, Info, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';
import { useLocalStorage } from '@/components/hooks/use_local_storage';
import { useIsMounted } from '@/components/hooks/use_isMounted';
import { TProduct } from '@/app/products/_actions/actions';

type AddToCartButtonProps = {
  product: TProduct;
  forceRedirect?: string;
  action?: 'addToCart' | 'BuyNow';
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
  const isMounted = useIsMounted();
  const [cart, setCartItem] = useLocalStorage<TProduct[]>('cart', []);

  const cartItem = cart.find(item => item.asin === product.asin);
  let textContent: React.ReactNode = action === 'addToCart' ? 'Add to cart' : 'Buy now';

  if (isMounted() && cartItem)
    textContent = (
      <span title='Delete from cart' className='flex items-center gap-2'>
        <Trash2 className='size-5 text-destructive' />
      </span>
    );

  return (
    <Button
      variant={variant ? variant : isMounted() && cartItem ? 'ghost' : 'default'}
      className={cn(
        'text-xs lg:text-sm',
        className,
        isMounted() && cartItem ? 'aspect-square rounded-full' : ''
      )}
      onClick={() => {
        if (cartItem) {
          product.cartQuantity = product.cartQuantity ? product.cartQuantity - 1 : 0;
          setCartItem(cart => cart.filter(i => i.asin !== product.asin));
        } else {
          if (product.stockQuantity < 1 || !product.stockQuantity) {
            return toast.error('Product out of stock', {
              icon: <Ban className='text-red-400' />
            });
          }
          product.cartQuantity = product.cartQuantity ? product.cartQuantity + 1 : 1;
          setCartItem(cart => [...cart, product]);
        }
        if (forceRedirect && !cartItem) router.push(forceRedirect);
        toast.custom(() => {
          return (
            <div className='flex items-center gap-4'>
              {isMounted() && cartItem ? (
                <Info className='text-blue-400' />
              ) : (
                <CheckSquare className='text-green-400' />
              )}
              <p className='text-sm'>
                Item {isMounted() && cartItem ? 'removed' : 'added'} to cart
              </p>
            </div>
          );
        });
      }}
      {...props}>
      {textContent}
    </Button>
  );
}
