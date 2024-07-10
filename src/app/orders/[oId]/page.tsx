import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type OrderProps = {
  params: { oId: string };
};

const dummyItems = [
  {
    id: 'B098JGRWFX',
    image: 'https://m.media-amazon.com/images/I/61gC6PBsRPL.jpg',
    title: 'Astro A10 Gaming Headset Gen 2 Wired - Over-Ear Headphones',
    price: '$54.99'
  },
  {
    id: 'B0BT3FKZ3N',
    image: 'https://m.media-amazon.com/images/I/71Fr-EEsp6L.jpg',
    title: 'MSI Katana 15 15.6" 144Hz FHD Gaming Laptop',
    price: '$899.99'
  },
  {
    id: 'B098JGRWFX',
    image: 'https://m.media-amazon.com/images/I/61gC6PBsRPL.jpg',
    title: 'Astro A10 Gaming Headset Gen 2 Wired - Over-Ear Headphones',
    price: '$54.99'
  },
  {
    id: 'B0BT3FKZ3N',
    image: 'https://m.media-amazon.com/images/I/71Fr-EEsp6L.jpg',
    title: 'MSI Katana 15 15.6" 144Hz FHD Gaming Laptop',
    price: '$899.99'
  }
];

export default function OrderPage({ params: { oId } }: OrderProps) {
  const total = dummyItems.reduce(
    (acc, { price }) => acc + parseFloat(price.replace('$', '')),
    0
  );

  return (
    <main className='min-h-screen max-w-screen-xl mx-auto bg-secondary'>
      <Card className='px-4 py-8 flex flex-col rounded-none xl:p-8'>
        <CardHeader className='px-0'>
          <CardTitle className='flex items-center'>
            Order #<span className='text-2xl text-muted-foreground'>{oId}</span>
          </CardTitle>
        </CardHeader>
        <Separator />
        {/* Items */}
        <Card className='p-4 my-8'>
          <CardHeader className='p-0 py-6'>
            <CardTitle className='pb-2 text-lg text-muted-foreground font-semibold'>
              Items
            </CardTitle>
          </CardHeader>
          <CardContent className='px-0 pb-0 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 lg:gap-8'>
            {dummyItems.map(({ id, image, title, price }, i) => (
              <Card
                key={id + i}
                className='flex items-center gap-4 p-4 bg-transparent rounded-none shadow-none max-w-md border-0'>
                <Image
                  className='size-16 object-contain'
                  width={100}
                  height={100}
                  src={image}
                  alt={title}
                />
                <div className='flex flex-col gap-2'>
                  <Link
                    href={`/products/${id}`}
                    className='hover:underline hover:text-blue-500'>
                    <p className='text-xs text-muted-foreground font-medium'>{title}</p>
                  </Link>
                  <p className='text-sm font-medium'>{price}</p>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className='flex flex-col justify-between gap-8 md:flex-row *:flex-1'>
          {/* Summary */}
          <Card className='p-4'>
            <CardHeader className='p-0 py-6'>
              <CardTitle className='pb-2 text-lg text-muted-foreground font-semibold'>
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className='px-0 pb-0'>
              <div className='divide-y *:p-2'>
                <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
                  <p className='text-sm'>Items</p>
                  <span className='text-sm'>{dummyItems.length}</span>
                </div>
                <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
                  <p className='text-sm'>Subtotal</p>
                  <span className='text-sm'>${total}</span>
                </div>
                <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
                  <p className='text-sm'>Shipping</p>
                  <span className='text-sm'>free</span>
                </div>
                <div className='flex items-center justify-between text-muted-foreground uppercase font-medium'>
                  <p className='text-sm'>Status</p>
                  <span className='text-sm'>Paid</span>
                </div>
              </div>
              <CardFooter className='p-0 px-2 h-10 mt-4 bg-muted hover:bg-muted/50 border-muted-foreground border-t items-center justify-between text-muted-foreground uppercase font-semibold'>
                <p>Total</p>
                <span>${total.toFixed(2)}</span>
              </CardFooter>
            </CardContent>
          </Card>
          {/* Shipping */}
          <Card className='p-4'>
            <CardHeader className='p-0 py-6'>
              <CardTitle className='pb-2 text-lg text-muted-foreground font-semibold'>
                Shipping Info
              </CardTitle>
            </CardHeader>
            <div className='grid gap-2 pl-4 border-l'>
              <CardDescription className='text-sm'>
                Name: <span className='font-semibold'>John Doe</span>
              </CardDescription>
              <CardDescription className='text-sm'>
                Address:{' '}
                <span className='font-semibold'>1234 Labor St, Zayed, Giza, EG</span>
              </CardDescription>
              <CardDescription className='text-sm'>
                Contact Phone: <span className='font-semibold'>(217) 555-5555</span>
              </CardDescription>
              <CardDescription className='text-sm'>
                City: <span className='font-semibold'>Giza</span>
              </CardDescription>
              <CardDescription className='text-sm'>
                Status: <span className='font-semibold'>In Transite</span>
              </CardDescription>
            </div>
          </Card>
        </div>
      </Card>
    </main>
  );
}
