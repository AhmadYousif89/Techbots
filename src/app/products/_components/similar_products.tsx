import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';
import { RatingStars } from './reviews/rating_stars';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '../_lib/types';

type SimilarProductsProps = {
  asin: string;
  category: Category;
};

export async function SimilarProducts({ asin, category }: SimilarProductsProps) {
  const products = await prisma.product.findMany({
    where: { asin: { not: asin }, category },
    orderBy: { rating: 'desc' },
    take: 8
  });

  return (
    <Carousel
      className='max-w-[80vw] mx-auto xl:max-w-screen-lg'
      opts={{ dragFree: true, skipSnaps: true, align: 'start' }}>
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={product.asin + index} className='basis-48 grid pb-4'>
            <Card className='p-2 flex justify-center'>
              <Link
                href={`/products/${product.asin}?category=${product.category}`}
                className='flex flex-col justify-between'>
                <Image
                  src={product.mainImage}
                  alt={product.title}
                  width={100}
                  height={100}
                  className='size-36 p-2 object-contain group-hover:scale-105 transition-transform duration-200'
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
  );
}
