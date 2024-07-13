import Stripe from 'stripe';
import Link from 'next/link';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import { SearchParams } from '@/app/products/_lib/types';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
type SuccessPageProps = {
  searchParams: SearchParams;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams['payment_intent'] as string
  );
  if (paymentIntent.metadata == null) return notFound();

  const products = await prisma.product.findMany({
    where: {
      asin: {
        in: Object.values(paymentIntent.metadata)
      }
    }
  });

  if (products.length === 0) return notFound();

  const isSuccessful = paymentIntent.status === 'succeeded';

  return (
    <main className='min-h-screen max-w-screen-xl mx-auto bg-background'>
      <Card className='p-6 max-w-screen-sm rounded-none border-0 shadow-none'>
        <CardHeader className='px-0'>
          <CardTitle className='font-semibold'>
            {isSuccessful ? 'Payment Successful!' : 'Payment Failed'}
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className='space-y-4 px-0 my-8'>
          {products.map(product => (
            <Card key={product.asin} className='flex items-center gap-4 p-2'>
              <div className='p-2'>
                <Image
                  src={product.mainImage}
                  alt={product.title}
                  width={100}
                  height={100}
                  className='size-12 object-cover'
                />
              </div>
              <div className='flex items-center justify-between gap-4 flex-1'>
                <Link href={`/products/${product.asin}`} className='text-xs'>
                  {product.title.split(' ').slice(0, 4).join(' ')}
                </Link>
                <Badge className=''>
                  {product.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </Badge>
              </div>
            </Card>
          ))}
        </CardContent>

        <Separator />

        <CardFooter className='pt-6'>
          <Button variant={isSuccessful ? 'default' : 'outline'}>
            {isSuccessful ? (
              <Link href='/orders'>Download your payment intent</Link>
            ) : (
              <Link href='/checkout/stripe?'>Try Again</Link>
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
