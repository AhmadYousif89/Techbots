'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { TProduct } from '@/app/products/_actions/actions';
import { Heart, Info } from 'lucide-react';

import { Button } from '../ui/button';
import { useLocalStorage } from '../hooks/use_local_storage';

type AddToWishlistButtonProps = {
  product: TProduct;
  className?: string;
  logoSize?: number;
};

export function AddToWishlistButton({
  product,
  className,
  logoSize = 24
}: AddToWishlistButtonProps) {
  const [item, setItem] = useState('');
  const [wishlist, setWishlist] = useLocalStorage<TProduct[]>('wishlist', []);

  useEffect(() => {
    const wishItem = wishlist.find((item: TProduct) => item.asin === product.asin);
    if (wishItem) {
      setItem(wishItem.brand);
    } else {
      setItem('');
    }
  }, [wishlist.length, product.asin, wishlist]);

  return (
    <Button
      variant='ghost'
      title={item ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(className, 'rounded-full aspect-square p-0')}
      onClick={() => {
        toast.custom(() => {
          if (item) {
            setItem('');
            setWishlist(wishlist => wishlist.filter(item => item.asin !== product.asin));
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
      <Heart
        size={logoSize}
        className={cn('text-destructive', item && 'fill-destructive')}
      />
    </Button>
  );
}
