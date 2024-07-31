'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

import { TProduct } from '../_lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AddToCartButton } from '@/components/cart_menu/add_button';
import { AddToWishlistButton } from '@/components/wishlist_menu/add_button';

type Item = {
  cartId: string;
  quantity: number;
};
type Props = {
  product: TProduct;
  checkCartItem: Promise<Item | null>;
};

export function ProductInteractionButtons({ product, checkCartItem }: Props) {
  const { userId } = useAuth();
  const checkItemInCart = use(checkCartItem);

  const inCart = checkItemInCart && userId;

  return (
    <div className='flex items-center justify-between gap-4 col-span-full'>
      <div className='flex items-center gap-4'>
        <Badge className='shadow-sm py-1 text-muted-foreground' variant={'outline'}>
          $ {product.price.toFixed(2)}
        </Badge>
        {inCart && (
          <Button
            size={'sm'}
            className='text-xs font-semibold shadow-sm h-auto py-1 rounded-full active:translate-y-[1px]'>
            <Link href={`/cart?cid=${checkItemInCart.cartId}`}>View in cart</Link>
          </Button>
        )}
      </div>
      <div className='flex items-center gap-4 lg:gap-8'>
        <AddToCartButton action='addToCart' product={product} />
        <AddToWishlistButton logoSize={20} product={product} />
      </div>
    </div>
  );
}
