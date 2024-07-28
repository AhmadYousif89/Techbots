import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { Info, Trash2 } from 'lucide-react';
import { capitalizeString } from '@/lib/utils';
import { useCartMenuState, useWishlistMenuState } from '@/lib/store';

import { TProduct } from '../_lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/app/cart/_store/cart';
import { removeFromServerCart } from '@/app/cart/_actions/actions';
import { useLocalStorage } from '@/components/hooks/use_local_storage';

type ProductThumbnailProps = {
  product: TProduct;
  type: 'cart' | 'wishlist';
};

export function ProductThumbnail({ product, type }: ProductThumbnailProps) {
  const { setIsOpen: setIsCartOpen } = useCartMenuState();
  const { setIsOpen: setIsWishlistOpen } = useWishlistMenuState();

  return (
    <Card className='flex items-center gap-2 p-2'>
      <Image
        src={product.mainImage}
        alt={product.title}
        width={80}
        height={80}
        className='size-14 px-2 object-contain'
      />
      <div className='flex items-center justify-between w-full'>
        <CardTitle className='flex flex-col text-sm mb-2 font-medium'>
          <div className='flex items-center gap-2 mb-2'>
            <Badge
              variant='outline'
              className='text-muted-foreground font-semibold shadow-sm py-1'>
              {capitalizeString(product.category)}
            </Badge>
            <Badge
              variant='outline'
              className='text-muted-foreground font-semibold shadow-sm py-1'>
              ${product.price.toFixed(2)}
            </Badge>
          </div>
          <Link
            href={`/products/${product.asin}?cat=${product.category}`}
            className='ml-2 text-xs text-muted-foreground hover:underline hover:text-blue-500'
            onClick={() => {
              if (type === 'cart') setIsCartOpen(false);
              else setIsWishlistOpen(false);
            }}>
            {product.title.split(' ').slice(0, 4).join(' ')}
          </Link>
        </CardTitle>

        <DeleteThumbnailButton product={product} type={type} />
      </div>
    </Card>
  );
}

function DeleteThumbnailButton({ product, type }: ProductThumbnailProps) {
  const { userId } = useAuth();
  const removeFromCart = useCartStore(s => s.removeFromCart);
  const { '1': setStoredItems } = useLocalStorage<TProduct[]>('wishlist', []);

  const handleDelete = () => {
    if (type === 'cart') {
      removeFromCart(product.asin);
      if (userId) {
        removeFromServerCart(userId, product.asin, product.price);
      }
    } else {
      setStoredItems(items => items.filter(item => item.asin !== product.asin));
    }

    toast.custom(() => {
      return (
        <div className='flex items-center gap-4'>
          <Info className='text-blue-500' />
          <p className='text-sm'>
            Item removed from {type === 'cart' ? 'cart' : 'wishlist'}
          </p>
        </div>
      );
    });
  };

  return (
    <Button
      variant={'destructive'}
      title={type === 'cart' ? 'Remove from cart' : 'Remove from wishlist'}
      className='size-6 p-1 bg-transparent hover:bg-destructive/20'
      onClick={() => handleDelete()}>
      <Trash2 className='text-destructive' />
    </Button>
  );
}
