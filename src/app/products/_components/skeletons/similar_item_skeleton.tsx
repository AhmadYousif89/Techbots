import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export function SimilarItemSkeleton() {
  return (
    <Carousel
      className='mx-auto max-w-[min(320px,80vw)] sm:max-w-xl md:max-w-2xl lg:max-w-screen-md xl:max-w-screen-lg'
      opts={{ dragFree: true, align: 'start' }}>
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className='basis-48 grid pb-4'>
            <Card className='p-2 grid min-h-44 shadow-sm'>
              <Skeleton className='min-h-36 mb-2 bg-input' />
              <Skeleton className='w-full h-4 my-2  bg-input/50' />
              <div className='flex justify-between gap-4 items-center'>
                <Skeleton className='w-full h-2.5  bg-input/70' />
                <Skeleton className='w-full h-2.5 bg-input/95' />
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='top-full translate-y-1/2 left-0' />
      <CarouselNext className='top-full translate-y-1/2 right-0' />
    </Carousel>
  );
}
