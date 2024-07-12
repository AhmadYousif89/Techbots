import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

import { Info, Trash2 } from 'lucide-react';
import { useCartMenuState, useWishlistMenuState } from '@/lib/store';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { useLocalStorage } from '@/components/hooks/use_local_storage';
import { Product } from '../_actions/actions';
import { capitalizeString } from '@/lib/utils';

type ProductThumbnailProps = {
  product: Product;
  type: 'cart' | 'wishlist';
};

export function ProductThumbnail({ product, type }: ProductThumbnailProps) {
  const { setIsOpen: setIsCartOpen } = useCartMenuState();
  const { setIsOpen: setIsWishlistOpen } = useWishlistMenuState();
  const { '1': setStoredItems } = useLocalStorage<Product[]>(type, []);

  return (
    <Card className='flex items-center p-2'>
      <Image
        src={product.mainImage}
        alt={product.title}
        width={80}
        height={80}
        className='size-14 pr-2 object-contain'
      />
      <div className='flex items-center justify-between w-full'>
        <CardTitle className='flex flex-col text-sm mb-2 font-medium'>
          <div className='flex items-center gap-2 mb-2'>
            <Badge variant='outline'>{capitalizeString(product.category)}</Badge>
            <Badge variant='outline'>$ {product.price.toFixed(2)}</Badge>
          </div>
          <Link
            href={`/products/${product.asin}`}
            className='text-xs text-muted-foreground hover:underline hover:text-blue-600'
            onClick={() => {
              if (type === 'cart') setIsCartOpen(false);
              if (type === 'wishlist') setIsWishlistOpen(false);
            }}>
            {product.title.split(' ').slice(0, 4).join(' ')}
          </Link>
        </CardTitle>

        <Button
          variant={'destructive'}
          title={type === 'cart' ? 'Remove from cart' : 'Remove from wishlist'}
          className='size-6 p-1 bg-transparent hover:bg-destructive/20'
          onClick={() => {
            setStoredItems(items => items.filter(item => item.asin !== product.asin));
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
          }}>
          <Trash2 className='text-destructive' />
        </Button>
      </div>
    </Card>
  );
}
