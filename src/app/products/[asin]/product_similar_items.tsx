import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';
import { cache } from '@/lib/cache';
import { RatingStars } from '../_components/reviews/rating_stars';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getProductCategory } from './page';

const getSimilarProducts = cache(
  async (asin: string) => {
    const category = await getProductCategory(asin);

    return await prisma.product.findMany({
      where: { asin: { not: asin }, category },
      orderBy: { rating: 'desc' },
      take: 8,
    });
  },
  ['getSimilarProducts']
);

export async function SimilarProducts({ asin }: { asin: string }) {
  const products = await getSimilarProducts(asin);

  return (
    <Card id='similar_products' className='rounded-none py-10 sm:px-4 xl:px-8'>
      <CardHeader>
        <h2 className='text-2xl font-medium'>Customers also viewed</h2>
      </CardHeader>
      <CardContent className='p-6 mb-6'>
        <Carousel
          className='max-w-[80vw] mx-auto xl:max-w-screen-lg'
          opts={{ dragFree: true, skipSnaps: true, align: 'start' }}>
          <CarouselContent>
            {products.map(product => (
              <CarouselItem key={product.id} className='basis-48 grid pb-4'>
                <Card className='p-2 flex justify-center'>
                  <Link
                    href={`/products/${product.asin}?cat=${product.category}`}
                    className='flex flex-col justify-between'>
                    <Image
                      src={product.mainImage}
                      alt={product.title}
                      width={100}
                      height={100}
                      className='size-32 p-4 object-contain'
                    />
                    <CardContent className='mt-auto py-0 px-0'>
                      <p className='text-xs font-medium mb-1'>
                        {product.title.split(' ').slice(0, 3).join(' ')}
                      </p>
                      <div className='flex items-center justify-between'>
                        <p className='text-xs text-muted-foreground'>
                          ${product.price.toFixed(2)}
                        </p>
                        <RatingStars
                          productRating={product.rating}
                          showTotalReviews={false}
                          size='xs'
                        />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='top-full translate-y-1/2 left-0' />
          <CarouselNext className='top-full translate-y-1/2 right-0' />
        </Carousel>
      </CardContent>
    </Card>
  );
}
