import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { TProduct } from '@/app/products/_lib/types';
import { Info, Minus, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocalStorage } from '@/components/hooks/use_local_storage';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useIsMounted } from '@/components/hooks/use_isMounted';

export function CartItem({ product }: { product: TProduct }) {
  const [cart, setCart] = useLocalStorage<TProduct[]>('cart', []);
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
      <Card className='p-4 shadow-sm w-full max-w-28 self-start grid place-content-center'>
        <Image
          src={currentProduct.mainImage}
          alt={currentProduct.title}
          width={100}
          height={100}
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
          {currentProduct.description?.split(' ').slice(0, 10).join(' ')}
          {!currentProduct.description &&
            currentProduct.featureBulletsFlat?.split('. ').slice(1, 3).join(' ')}
          {!currentProduct.description &&
            !currentProduct.featureBulletsFlat &&
            currentProduct.specificationsFlat?.split('. ').slice(0, 3).join(' ')}
        </CardDescription>

        <div className='font-medium'>
          <Badge variant={'outline'} className='text-sm font-medium'>
            $ {currentProduct.price.toFixed(2)}
          </Badge>
        </div>

        <div className='flex items-center gap-4 mt-6'>
          <Button
            disabled={currentProduct.cartQuantity === currentProduct.stockQuantity}
            variant='outline'
            className='size-7 p-1'
            onClick={() => {
              const quantity = currentProduct.cartQuantity
                ? currentProduct.cartQuantity + 1
                : 1;
              setCart(cart => {
                const itemIndex = cart.findIndex(
                  item => item.asin === currentProduct.asin
                );
                if (itemIndex !== -1) {
                  cart[itemIndex] = { ...currentProduct, cartQuantity: quantity };
                }
                return cart;
              });
            }}>
            <Plus />
          </Button>
          <Badge
            variant={'outline'}
            className='p-2 w-20 h-8 inline-grid place-content-center shadow-sm'>
            {currentProduct.cartQuantity} / {currentProduct.stockQuantity}
          </Badge>
          {currentProduct.cartQuantity === 1 ? (
            <DeleteCartItems
              product={currentProduct}
              deleteItemNotification={deleteItemNotification}
            />
          ) : (
            <Button
              size='icon'
              variant='outline'
              className='size-7 p-1'
              onClick={() => {
                currentProduct.cartQuantity = currentProduct.cartQuantity
                  ? currentProduct.cartQuantity - 1
                  : 0;
                setCart(cart => {
                  const item = cart.find(item => item.asin === currentProduct.asin);
                  const itemIndex = cart.findIndex(
                    item => item.asin === currentProduct.asin
                  );
                  if (item) {
                    item.cartQuantity = currentProduct.cartQuantity;
                    cart[itemIndex] = item;
                  }
                  return cart;
                });
              }}>
              <Minus />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

type DeleteCartItemsProps = {
  action?: 'deleteOne' | 'deleteAll';
  product: TProduct;
  deleteItemNotification: JSX.Element;
};

function DeleteCartItems({
  // action = 'deleteOne',
  product,
  deleteItemNotification
}: DeleteCartItemsProps) {
  const [dialogIsOpen, setDialogState] = useState(false);
  const [cart, setCart] = useLocalStorage<TProduct[]>('cart', []);
  const isMounted = useIsMounted();
  let cartCount = 0;

  if (isMounted()) cartCount = cart.length;
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogState}>
      <DialogTrigger asChild>
        <Button
          variant='destructive'
          className='size-7 p-1 bg-destructive/20 hover:bg-transparent'>
          <Trash2 className='text-destructive' />
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
              product.cartQuantity = product.cartQuantity ? product.cartQuantity - 1 : 0;
              setCart(cart => cart.filter(item => item.asin !== product.asin));
              toast.custom(() => deleteItemNotification);
            }}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
