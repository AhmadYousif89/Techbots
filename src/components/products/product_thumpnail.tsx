import Link from 'next/link';
import Image from 'next/image';
import { Info, Trash2 } from 'lucide-react';
import { ProductType } from '../../../data';

import { Card, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { useCartMenuState } from '@/lib/store';
import { useLocalStorage } from '../hooks/use_local_storage';

type ProductThumbnailProps = {
  product: ProductType;
  type: 'cart' | 'wishlist';
};

export function ProductThumbnail({ product, type }: ProductThumbnailProps) {
  const { setIsOpen } = useCartMenuState();
  const { '1': setStoredItems } = useLocalStorage<ProductType[]>(type, []);

  return (
    <Card className='flex items-center p-4'>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={80}
        height={80}
        className='size-20'
      />
      <div className='flex items-center justify-between gap-4 w-full'>
        <div>
          <CardTitle className='flex flex-col text-sm mb-2'>
            <Badge variant='outline' className='font-medium mb-1 -ml-1 w-fit'>
              {product.category}
            </Badge>
            <Link href={`/products/${product.id}`} onClick={() => setIsOpen(false)}>
              {product.name.split(' ').slice(0, 4).join(' ')}
            </Link>
          </CardTitle>
          <div className='font-medium text-sm text-muted-foreground'>
            <span>${product.salePrice}</span>
          </div>
        </div>
        <Button
          title={type === 'cart' ? 'Remove from cart' : 'Remove from wishlist'}
          variant={'destructive'}
          className='size-8 aspect-square p-0'
          onClick={() => {
            setStoredItems(items => items.filter(item => item.id !== product.id));
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
          <Trash2 size={20} />
        </Button>
      </div>
    </Card>
  );
}