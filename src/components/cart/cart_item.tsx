import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Info, Minus, Plus, Trash2 } from 'lucide-react';

import { Card, CardDescription, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useLocalStorage } from '../hooks/use_local_storage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import Link from 'next/link';
import { Product } from '@/lib/types';

export function CartItem({ product }: { product: Product }) {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  const currentProduct = cart.find(item => item.asin === product.asin);

  if (!currentProduct) {
    return null;
  }

  const deleteItemNotification = (
    <div className='flex items-center gap-4'>
      <Info className='text-blue-500' />
      <span className='text-sm'>Item deleted from cart</span>
    </div>
  );

  return (
    <div className='flex gap-8 mt-4 even:pt-8'>
      <Card className='p-2 shadow w-full max-w-28 sm:max-w-36 self-start'>
        <Image
          src={currentProduct.main_image.link}
          alt='Product Image'
          width={200}
          height={200}
        />
      </Card>

      <div>
        <div className='flex gap-2 mb-2'>
          <Badge
            variant={'outline'}
            className='bg-green-500 border-0 text-background shadow'>
            On Sale
          </Badge>
        </div>
        <CardTitle className='text-lg font-medium'>
          <Link href={`/products/${product.asin}`}>
            {currentProduct.title.split(' ').slice(0, 4).join(' ')}
          </Link>
        </CardTitle>
        <CardDescription className='pb-4 pt-2 text-xs max-w-[60ch]'>
          {currentProduct.description?.split(' ').slice(0, 15).join(' ')}
          {currentProduct.feature_bullets_flat.split(' ').slice(0, 15).join(' ')}
        </CardDescription>

        <div className='font-medium'>
          <Badge variant={'outline'} className='text-sm shadow-sm'>
            {currentProduct.price}
          </Badge>
        </div>

        <div className='flex items-center gap-4 mt-6'>
          <Button
            disabled={currentProduct.cart_quantity === currentProduct.stock_quantity}
            variant='outline'
            className='size-7 p-0'
            onClick={() => {
              ++currentProduct.cart_quantity;
              setCart(cart => {
                const item = cart.find(item => item.asin === currentProduct.asin);
                const itemIndex = cart.findIndex(
                  item => item.asin === currentProduct.asin
                );
                if (item) {
                  item.cart_quantity = currentProduct.cart_quantity;
                  cart[itemIndex] = item;
                }
                return cart;
              });
            }}>
            <Plus className='size-5' />
          </Button>
          <Badge
            variant={'outline'}
            className='p-2 w-20 h-8 inline-grid place-content-center shadow-sm'>
            {currentProduct.cart_quantity} / {currentProduct.stock_quantity}
          </Badge>
          {currentProduct.cart_quantity === 1 ? (
            <DeleteCartItems
              currentProduct={currentProduct}
              deleteItemNotification={deleteItemNotification}
            />
          ) : (
            <Button
              size='icon'
              variant='outline'
              className='size-8'
              onClick={() => {
                --currentProduct.cart_quantity;
                setCart(cart => {
                  const item = cart.find(item => item.asin === currentProduct.asin);
                  const itemIndex = cart.findIndex(
                    item => item.asin === currentProduct.asin
                  );
                  if (item) {
                    item.cart_quantity = currentProduct.cart_quantity;
                    cart[itemIndex] = item;
                  }
                  return cart;
                });
              }}>
              <Minus size={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

type DeleteCartItemsProps = {
  action?: 'deleteOne' | 'deleteAll';
  currentProduct: Product;
  deleteItemNotification: JSX.Element;
};

function DeleteCartItems({
  action = 'deleteOne',
  currentProduct,
  deleteItemNotification
}: DeleteCartItemsProps) {
  const [dialogIsOpen, setDialogState] = useState(false);
  const [_, setCart] = useLocalStorage<Product[]>('cart', []);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogState}>
      <DialogTrigger asChild>
        <Button variant='destructive' className='size-7 p-0'>
          <Trash2 className='size-5' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className='py-4'>
            This will delete the selected item from your cart.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2'>
          <Button variant={'outline'} onClick={() => setDialogState(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              --currentProduct.cart_quantity;
              setCart(cart => cart.filter(item => item.asin !== currentProduct.asin));
              toast.custom(() => deleteItemNotification);
            }}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
