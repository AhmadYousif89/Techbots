import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { ProductType } from '../../../data';
import { Card, CardContent } from '../ui/card';

export function SimilarProducts({
  products,
  currentProduct
}: {
  products: ProductType[];
  currentProduct: ProductType;
}) {
  return (
    <Carousel className='max-w-xl mx-auto' opts={{ align: 'start' }}>
      <CarouselContent>
        {products.map(product => (
          <CarouselItem
            key={product.id}
            className='basis-1/2 sm:basis-1/3 lg:basis-1/4 group'>
            <div className='p-1'>
              <Card className='p-2 rounded-xl overflow-hidden'>
                <CardContent className='flex aspect-square items-center justify-center p-0'>
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={250}
                      height={250}
                      className='group-hover:scale-110 transition-transform duration-200'
                    />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='absolute top-full translate-y-1/2 left-0' />
      <CarouselNext className='absolute top-full translate-y-1/2 right-0' />
    </Carousel>
  );
}
