import { SearchParams } from '@/app/products/_lib/types';
import { Checkout } from '../_component/checkout';
import { TProduct } from '@/app/products/_lib/types';
import prisma from '@/lib/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type PageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: PageProps) {
  const items: Partial<TProduct>[] = [];
  Object.entries(searchParams).map(item => {
    const prod = {
      asin: item[1]?.split(' ')[0],
      cartQuantity: item[1]?.split(' ')[1],
    } as Partial<TProduct>;
    items.push(prod);
  });

  const products = (await prisma.product.findMany({
    where: {
      asin: {
        in: items.map(item => item.asin) as string[],
      },
    },
  })) as TProduct[];

  const totalAmount = products.reduce((acc, item) => {
    const cartItem = items.find(cartItem => cartItem.asin === item.asin);
    return acc + item.price * (cartItem?.cartQuantity || 1);
  }, 0);

  const result: { [k: string]: string } = {};
  items.forEach((item, index) => {
    result[index + 1] = item.asin ?? '';
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // in cents
    currency: 'USD',
    metadata: result, // { '1': 'B07JGJ7B17', '2': 'B07JGJ7B18'}
  });

  if (paymentIntent.client_secret == null) {
    throw new Error('Stripe -- Failed to create a payment intent');
  }

  return (
    <main className='bg-background min-h-screen max-view mx-auto'>
      <Checkout clientSecret={paymentIntent.client_secret} />
    </main>
  );
}
