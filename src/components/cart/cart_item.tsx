import Image from 'next/image';
import { toast } from 'sonner';
import { Info, Minus, Plus, Trash2 } from 'lucide-react';
import { ProductType } from '../../../data';

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
import { useState } from 'react';

export function CartItem({ product }: { product: ProductType }) {
  const [dialogIsOpen, setDialogState] = useState(false);
  const [cart, setCart] = useLocalStorage<ProductType[]>('cart', []);
  const currentProduct = cart.find(item => item.id === product.id);

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
          src={currentProduct.images[0]}
          alt='Product Image'
          width={200}
          height={200}
        />
      </Card>

      <div>
        <div className='flex gap-2 mb-2'>
          {currentProduct.salePrice && (
            <Badge
              variant={'outline'}
              className='bg-green-500 border-0 text-background shadow'>
              On Sale
            </Badge>
          )}
        </div>
        <CardTitle className='text-sm font-medium'>
          <Link href={`/products/${product.id}`}>
            {currentProduct.name.split(' ').slice(0, 4).join(' ')}
          </Link>
        </CardTitle>
        <CardDescription className='py-2 max-w-[60ch]'>
          {currentProduct.description.split(' ').slice(0, 15).join(' ')}...
        </CardDescription>

        <div className='flex items-center gap-4 my-4 font-medium'>
          <span className='text-sm text-muted-foreground line-through'>
            ${currentProduct.regularPrice}
          </span>
          <p className='font-medium'>
            <Badge variant={'outline'} className='text-sm shadow-sm'>
              $ {currentProduct.salePrice}
            </Badge>
          </p>
        </div>

        <div className='flex items-center gap-4 mt-6'>
          <Button
            size='icon'
            disabled={currentProduct.cartQuantity === currentProduct.quantity}
            variant='outline'
            className='size-8'
            onClick={() => {
              ++currentProduct.cartQuantity;
              setCart(cart => {
                const item = cart.find(item => item.id === currentProduct.id);
                const itemIndex = cart.findIndex(item => item.id === currentProduct.id);
                if (item) {
                  item.cartQuantity = currentProduct.cartQuantity;
                  cart[itemIndex] = item;
                }
                return cart;
              });
            }}>
            <Plus size={20} />
          </Button>
          <Badge
            variant={'outline'}
            className='p-2 w-16 h-8 grid place-content-center shadow-sm'>
            {currentProduct.cartQuantity} / {currentProduct.quantity}
          </Badge>
          {currentProduct.cartQuantity === 1 ? (
            <Dialog open={dialogIsOpen} onOpenChange={setDialogState}>
              <DialogTrigger asChild>
                <Button size='icon' variant='destructive' className='size-8'>
                  <Trash2 size={20} />
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
                      --currentProduct.cartQuantity;
                      setCart(cart => cart.filter(item => item.id !== currentProduct.id));
                      toast.custom(() => deleteItemNotification);
                    }}>
                    Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              size='icon'
              variant='outline'
              className='size-8'
              onClick={() => {
                --currentProduct.cartQuantity;
                setCart(cart => {
                  const item = cart.find(item => item.id === currentProduct.id);
                  const itemIndex = cart.findIndex(item => item.id === currentProduct.id);
                  if (item) {
                    item.cartQuantity = currentProduct.cartQuantity;
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
