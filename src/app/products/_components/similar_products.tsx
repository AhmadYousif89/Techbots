import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { RatingStars } from './reviews/rating_stars';
import { Category, getSimilarProducts } from '../_actions/actions';

type SimilarProductsProps = {
  pId: string;
  category: Category;
};

export async function SimilarProducts({ pId, category }: SimilarProductsProps) {
  const products = await getSimilarProducts(category, pId);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <Carousel
      className='mx-auto max-w-[min(320px,80vw)] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-screen-lg'
      opts={{ dragFree: true, skipSnaps: true, align: 'start' }}>
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={product.asin + index} className='basis-48 grid pb-4 ml-2'>
            <Card className='p-2 grid auto-rows-[1fr_auto] gap-4'>
              <Link
                href={`/products/${product.asin}`}
                className='grid place-content-center'>
                <Image
                  src={product.mainImage}
                  alt={product.title}
                  width={150}
                  height={150}
                  className='group-hover:scale-105 transition-transform duration-200'
                />
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
