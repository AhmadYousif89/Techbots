import Link from 'next/link';
import Image from 'next/image';

import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { featuredProducts } from '../../../data';

export function FeaturedProducts() {
  return (
    <section className='px-6 py-28 bg-secondary max-w-screen-xl lg:mx-auto'>
      <h2 className='text-2xl font-bold mb-12'>Featured Products</h2>
      <Carousel opts={{ align: 'end' }}>
        <CarouselContent>
          {featuredProducts.map(item => (
            <CarouselItem key={item.id} className='basis-11/12 sm:basis-1/2 lg:basis-1/3'>
              <Card className='grid max-w-lg h-full'>
                <CardHeader>
                  <h3 className='text-lg font-semibold'>{item.name}</h3>
                  <p className='mt-2 text-sm text-gray-500'>{item.description}</p>
                </CardHeader>
                <CardContent className='mt-auto'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    className='rounded-lg'
                    width={500}
                    height={250}
                  />
                </CardContent>
                <CardFooter className='grid gap-2 justify-between'>
                  <span className='text-sm text-gray-500 row-span-1 col-span-2'>
                    Starts from:
                  </span>
                  <span className='ring-2 ring-secondary p-2 rounded font-medium'>
                    {item.price}
                  </span>
                  <Link href={item.url}>
                    <Button
                      variant={'link'}
                      className='bg-primary/95 text-white rounded-md'>
                      {item.buttonTitle}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute top-full translate-y-1/2 left-0' />
        <CarouselNext className='absolute top-full translate-y-1/2 right-0' />
      </Carousel>
    </section>
  );
}
