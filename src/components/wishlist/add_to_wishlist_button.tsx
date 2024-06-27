'use client';

import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Heart, Info } from 'lucide-react';

import { Button } from '../ui/button';
import { ProductType } from '../../../data';
import { useLocalStorage } from '../hooks/use_local_storage';
import { useEffect, useState } from 'react';

export function AddToWishlistButton({ product }: { product: ProductType }) {
  const [item, setItem] = useState('');
  const [wishlist, setWishlist] = useLocalStorage<ProductType[]>('wishlist', []);

  useEffect(() => {
    const wishItem = wishlist.find((item: ProductType) => item.id === product.id);
    if (wishItem) {
      setItem(wishItem.name);
    } else {
      setItem('');
    }
  }, [wishlist.length]);

  return (
    <Button
      variant='ghost'
      className='rounded-full aspect-square p-0'
      onClick={() => {
        toast.custom(() => {
          if (item) {
            setItem('');
            setWishlist(wishlist => wishlist.filter(item => item.id !== product.id));
            return (
              <div className='flex items-center gap-4'>
                <Info className='text-blue-400' />
                <p className='text-sm'>Item removed from wishlist</p>
              </div>
            );
          }
          setWishlist(wishlist => [...wishlist, product]);
          return (
            <div className='flex items-center gap-4'>
              <Heart className='text-green-400' />
              <p className='text-sm'>Item added to wishlist</p>
            </div>
          );
        });
      }}>
      <Heart className={cn('text-destructive', item && 'fill-destructive')} />
    </Button>
  );
}
