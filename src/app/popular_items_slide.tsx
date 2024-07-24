import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';

import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from '../components/ui/carousel';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { RatingStars } from './products/_components/reviews/rating_stars';
import { Category } from './products/_lib/types';
import { cache } from '@/lib/cache';

const day = 60 * 60 * 24;

const getPopularItems = cache(
  async () => {
    const categories: Category[] = [
      'laptops',
      'mobiles',
      'headphones',
      'watches',
      'accessories',
    ];
    const allProducts = await prisma.product.findMany({
      where: { category: { in: categories } },
    });

    return categories.flatMap(category => {
      return allProducts.filter(product => product.category === category).slice(0, 2);
    });
  },
  ['/', 'getPopularItems'],
  { revalidate: day }
);

export async function PopularItemsSlide() {
  const products = await getPopularItems();

  return (
    <section className='bg-secondary py-10 px-6'>
      <div className='flex items-center gap-4 mb-12'>
        <h2 className='text-xl lg:text-2xl font-bold'>Popular Items</h2>
        <Button variant={'link'} className='hover:text-muted-foreground'>
          <Link href='/products?sort=popular'>View All</Link>
        </Button>
      </div>
      <Carousel
        className='ml-4 max-w-80vw xl:max-w-screen-lg xl:mx-auto'
        opts={{ dragFree: true, align: 'start' }}>
        <CarouselContent>
          {products.map(product => (
            <CarouselItem key={product.id} className='basis-48 grid pb-4'>
              <Card className='p-4 grid auto-rows-[1fr_auto] gap-4'>
                <Link
                  href={`/products/${product.asin}?cat=${product.category}`}
                  className='grid place-content-center'>
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    width={150}
                    height={150}
                  />
                </Link>
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
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='top-full -translate-y-2 left-0' />
        <CarouselNext className='top-full -translate-y-2 right-0' />
      </Carousel>
    </section>
  );
}
