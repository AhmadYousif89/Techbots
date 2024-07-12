'use client';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocalStorage } from '@/components/hooks/use_local_storage';
import { Order } from './cart_shipping';
import { useShippingFormStore } from '../_store/shipping_form';
import { TProduct } from '@/app/products/_actions/actions';
import { useEffect } from 'react';

export function CartPaymentView() {
  const router = useRouter();
  const { userId } = useAuth();
  const params = useSearchParams();
  const [cart, setCart] = useLocalStorage<TProduct[]>('cart', []);
  const [orders, setOrder] = useLocalStorage<Order[]>('order', []);
  const [hasOrder, setHasOrder] = useLocalStorage('hasOrder', false);
  const { data, setFormData } = useShippingFormStore();

  const formResult = Boolean(params.get('fr'));

  const items = cart.map(item => ({ asin: item.asin, cartQuantity: item.cartQuantity }));
  const total = cart.reduce(
    (acc, item) =>
      acc + (item.price * (item.cartQuantity || 1) + (data.shipping === 'next' ? 20 : 0)),
    0
  );

  useEffect(() => {
    const ids = items
      .map((p, i) => {
        return `p${i + 1}=${p.asin}+${p.cartQuantity}`;
      })
      .join('&');

    if (orders.length > 0) {
      router.push(`/checkout/stripe?${ids}`);
      setHasOrder(false);
    }
  }, [items, orders, router, setFormData, setHasOrder]);

  const confirmOrder = () => {
    if (!userId) {
      router.push('/sign-in');
      console.log('No user found');
      return;
    }
    if (!formResult) {
      router.push('/cart');
      console.log('No shipping data provided');
      return;
    }

    const order = {
      id: Math.random().toString(36).substring(2, 15),
      userId,
      shippingInfo: data,
      items,
      total
    };
    // add the order to the local storage
    setOrder(data => {
      // check if order already exists
      const orderIndex = data.findIndex(o => o.id === order.id);
      if (orderIndex === -1) {
        return [...data, order];
      }
      // order already exists, update the order
      const updatedOrder = { ...data[orderIndex], items, total };
      data[orderIndex] = updatedOrder;
      return data;
    });
  };

  return (
    <Card className='rounded-none py-10 min-h-screen'>
      <CardHeader className='space-y-4'>
        <CardTitle>Choose Your Payment</CardTitle>
        <CardDescription>
          Add your payment details here. We'll use this information to process your order.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'></CardContent>
      <CardFooter>
        <Button onClick={confirmOrder}>Confirm your order</Button>
      </CardFooter>
    </Card>
  );
}
