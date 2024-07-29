'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { Info, Minus, Plus, Trash2 } from 'lucide-react';

import { useCartStore } from '../_store/cart';
import useStore from '@/components/hooks/use-store';
import { TProduct } from '@/app/products/_lib/types';
import { DeleteCartItems } from './delete_button';
import { decrementServerCartItem, incrementServerCartItem } from '../_actions/actions';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

export function CartItem({ asin }: { asin: string }) {
  const { userId } = useAuth();
  const cart = useStore(useCartStore, s => s.cart) ?? [];
  const increaseQuantity = useCartStore(s => s.increaseQuantity);
  const decreaseQuantity = useCartStore(s => s.decreaseQuantity);

  const item = cart.find(item => item.asin === asin);

  if (!item) {
    return null;
  }

  const handleItemQuantity = async (action: 'increment' | 'decrement') => {
    if (action === 'increment') {
      increaseQuantity?.(item.asin);
      if (userId) {
        try {
          await incrementServerCartItem(userId, item.asin, item.price);
        } catch (error) {
          console.error('Error updating cart item:', error);
        }
      }
    } else {
      decreaseQuantity?.(item.asin);
      if (userId) {
        try {
          await decrementServerCartItem(userId, item.asin, item.price);
        } catch (error) {
          console.error('Error updating cart item:', error);
        }
      }
    }
  };

  return (
    <div className='flex gap-8 mt-4 even:pt-8 max-w-xl'>
      <Card className='p-2 shadow-sm w-full max-w-24 self-start grid place-content-center'>
        <Image
          title={asin}
          src={item.mainImage}
          alt={item.title}
          width={100}
          height={100}
        />
      </Card>

      <div>
        <div className='flex gap-2 mb-2'>
          <Badge
            variant={'outline'}
            className='bg-emerald-500 text-secondary border-0 shadow-sm'>
            On Sale
          </Badge>
          <Badge className='shadow-sm py-1 text-muted-foreground' variant={'outline'}>
            $ {item.price.toFixed(2)}
          </Badge>
        </div>
        <Link href={`/products/${item.asin}?cat=${item.category}`} className='group'>
          <CardTitle className='text-xs sm:text-sm text-muted-foreground font-medium group-hover:text-muted-foreground/80 transition-colors group-hover:underline'>
            {item.title}
          </CardTitle>
        </Link>

        <div className='flex items-center gap-4 mt-6'>
          <Button
            disabled={item.cartQuantity === item.stockQuantity}
            variant='outline'
            className='size-7 p-1'
            onClick={() => handleItemQuantity('increment')}>
            <Plus />
          </Button>
          <Badge
            variant={'outline'}
            className='p-2 w-20 h-8 inline-grid place-content-center shadow-sm'>
            {item.cartQuantity} / {item.stockQuantity}
          </Badge>
          {item.cartQuantity > 1 ? (
            <Button
              size='icon'
              variant='outline'
              className='size-7 p-1'
              onClick={() => handleItemQuantity('decrement')}>
              <Minus />
            </Button>
          ) : (
            <DeleteCartItems action='deleteOne' asin={item.asin} price={item.price} />
          )}
        </div>
      </div>
    </div>
  );
}
