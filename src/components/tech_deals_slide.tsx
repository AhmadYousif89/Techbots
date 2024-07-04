import Link from 'next/link';
import Image from 'next/image';
import { getProductsByCategory } from '@/lib/actions';
import { RatingStars } from './products/reviews/rating_stars';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Card, CardContent } from './ui/card';

export async function TechDealsSlide() {
  const gpu = (await getProductsByCategory('gpu')).slice(0, 2);
  const computers = (await getProductsByCategory('computers')).slice(0, 2);
  const cpu = (await getProductsByCategory('cpu')).slice(0, 2);
  const accessories = (await getProductsByCategory('accessories')).slice(5, 7);
  const products = [...gpu, ...cpu, ...computers, ...accessories];

  return (
    <section className='bg-secondary py-10 px-6'>
      <h2 className='text-2xl font-bold mb-12'>Tech Deals</h2>
      <Carousel
        className='mx-auto max-w-[min(320px,80vw)] sm:max-w-xl md:max-w-2xl lg:max-w-screen-md xl:max-w-screen-lg'
        opts={{ dragFree: true, skipSnaps: true, align: 'start' }}>
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              key={product.asin + index}
              className='basis-48 lg:basis-56 grid pb-4'>
              <Card className='p-2 grid auto-rows-[1fr_auto] gap-4'>
                <Link
                  href={`/products/${product.asin}`}
                  className='grid place-content-center'>
                  <Image
                    src={product.main_image.link}
                    alt={product.title}
                    width={150}
                    height={150}
                    className='group-hover:scale-105 transition-transform duration-200'
                  />
                </Link>
                <CardContent className='mt-auto py-0 px-0'>
                  <p className='text-xs font-medium mb-1'>
                    {product.title.split(' ').slice(0, 3).join(' ')}
                  </p>
                  <div className='flex items-center justify-between'>
                    <p className='text-xs text-muted-foreground'>{product.price}</p>
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