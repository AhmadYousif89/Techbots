'use client';

import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { CheckSquare, Info } from 'lucide-react';

import { Button } from '../ui/button';
import { ProductType } from '../../../data';
import { useLocalStorage } from '../hooks/use_local_storage';

export function AddToCartButton({ product }: { product: ProductType }) {
  const [item, setItem] = useState('');
  const [cart, setCartItem] = useLocalStorage<ProductType[]>('cart', []);

  useEffect(() => {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      setItem(cartItem.name);
    } else {
      setItem('');
    }
  }, [cart.length]);

  return (
    <Button
      variant={item ? 'destructive' : 'default'}
      onClick={() => {
        if (item) {
          setItem('');
          --product.cartQuantity;
          setCartItem(cart => cart.filter(item => item.id !== product.id));
        } else {
          setItem(product.name);
          ++product.cartQuantity;
          setCartItem(cart => [...cart, product]);
        }
        toast.custom(() => {
          return (
            <div className='flex items-center gap-4'>
              {item ? (
                <Info className='text-blue-400' />
              ) : (
                <CheckSquare className='text-green-400' />
              )}
              <p className='text-sm'>Item {item ? 'removed' : 'added'} to cart</p>
            </div>
          );
        });
      }}>
      {item ? 'Remove from cart' : 'Buy now'}
    </Button>
  );
}
