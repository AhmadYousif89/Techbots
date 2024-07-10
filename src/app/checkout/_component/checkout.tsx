'use client';

import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Product } from '@/app/products/_actions/actions';
import { SearchParams } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getCartCount, getCartTotal } from '@/lib/utils';
import { useLocalStorage } from '@/components/hooks/use_local_storage';
import { useShippingFormStore } from '@/app/cart/_store/shipping_form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ProductThumbnail } from '@/app/products/_components/product_thumpnail';
import { CartItem } from '@/app/cart/_components/cart_item';
import { useIsMounted } from '@/components/hooks/use_isMounted';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { Ban } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { userOrderExists } from '../_actions/actions';

type CheckoutProps = {
  searchParams: SearchParams;
  products: Product[];
  clientSecret: string;
};

const loader = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export function Checkout({ searchParams, products, clientSecret }: CheckoutProps) {
  return (
    <Elements stripe={loader} options={{ clientSecret }}>
      <PaymentInformation />
    </Elements>
  );
}

function PaymentInformation() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState('');
  const { data, setFormData } = useShippingFormStore();
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  const isMounted = useIsMounted();
  let total: number = 0;
  let itemsCount;
  let VAT = 0;

  if (isMounted()) {
    total = getCartTotal(cart);
    itemsCount = getCartCount(cart);
    VAT = total * 0.2;
  }

  const fullAmount = (total + VAT + (data.shipping === 'next' ? 20 : 0)).toFixed(2);
  const isDisabled = !stripe || !elements || isLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !email) {
      toast.error('Please fill up all required fields', {
        icon: <Ban className='text-destructive' />,
        duration: 5000
      });
      return;
    }
    setIsloading(true);

    // const orderExist = await userOrderExists(email);

    // if (orderExist) {
    //   toast.error('You have already purchased these products.', {
    //     icon: <Ban className='text-destructive' />,
    //     duration: 5000
    //   });
    //   setIsloading(false);
    //   return
    // }
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/stripe/success`;
    // const url = `http://localhost:3000/checkout/stripe/success`;
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: url
        }
      })
      .then(({ error }) => {
        if (error.type == 'card_error' || error.type == 'validation_error') {
          toast.error(error.message, {
            icon: <Ban className='text-destructive' />,
            duration: 5000
          });
        } else {
          toast.error('An error occurred, please try again', {
            icon: <Ban className='text-destructive' />,
            duration: 5000
          });
        }
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <section className='px-4 py-0 max-w-screen-lg mx-auto'>
      <div className='flex items-center justify-between'>
        <h2 className='py-6 text-xl text-muted-foreground font-semibold'>
          Order Summary
        </h2>
        <Link href='/cart' className='text-sm hover:text-blue-600 hover:underline'>
          Edit Cart
        </Link>
      </div>
      <Card className='p-6'>
        <CardContent className='px-0 pb-0'>
          <Dialog>
            <DialogTrigger className='relative w-full h-full'>
              <div className='flex items-center justify-between text-sm text-muted-foreground uppercase font-medium underline cursor-pointer'>
                <p>Items</p>
                <span>{itemsCount}</span>
              </div>
            </DialogTrigger>
            <DialogContent className='px-4 py-12 overscroll-y-auto'>
              {cart.map((item, index) => (
                <Card key={index} className='px-4 group flex items-center gap-4'>
                  <div className='flex-1 flex items-center gap-4'>
                    <Image
                      src={item.mainImage}
                      alt={item.title}
                      width={100}
                      height={100}
                      className='size-20 object-contain'
                    />
                    <Link
                      href={`/products/${item.asin}`}
                      className='hover:underline hover:text-blue-500'>
                      <CardTitle className='text-sm font-medium'>
                        {item.title.split(' ').slice(0, 4).join(' ')}
                      </CardTitle>
                    </Link>
                  </div>

                  <div className='flex items-center gap-4'>
                    <Badge className='font-medium'>$ {item.price.toFixed(2)}</Badge>
                    <span className='text-sm font-medium'>x {item.cartQuantity}</span>
                  </div>
                </Card>
              ))}
            </DialogContent>
          </Dialog>
          <Separator className='my-4' />
          {/* Subtotal */}
          <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
            <p className='text-sm'>Subtotal</p>
            <span className='text-sm'>${total}</span>
          </div>
          <div className='flex items-center justify-between text-muted-foreground uppercase font-medium my-4'>
            <p className='text-sm'>Shipping</p>
            <span className='text-sm'>{data.shipping === 'next' ? '$20' : 'Free'}</span>
          </div>
          <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
            <p className='text-sm'>Taxes</p>
            <span className='text-sm'>${VAT}</span>
          </div>
          <Separator className='my-4' />
          <div className='flex items-center justify-between text-muted-foreground uppercase font-semibold text-sm'>
            <p>Total</p>
            <span>${fullAmount}</span>
          </div>
        </CardContent>
      </Card>
      <h2 className='py-6 text-xl text-muted-foreground font-semibold'>
        Payment Information
      </h2>

      <form onSubmit={handleSubmit}>
        <Card className=' p-6'>
          <PaymentElement className='py-6' />
          <div>
            <LinkAuthenticationElement onChange={e => setEmail(e.value.email)} />
          </div>
          <CardFooter className='px-0 pt-6'>
            <Button disabled={isDisabled}>
              {isLoading ? 'Processing...' : <>Purchase | ${fullAmount}</>}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
