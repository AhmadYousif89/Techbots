import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export function ItemCarouselSkeleton() {
  return (
    <div className='min-h-[600px] self-start pt-6 pb-16'>
      <div className='mx-4'>
        <Skeleton className='h-96 w-full bg-input/70' />
        <Skeleton className='w-full h-1 my-8 bg-input' />
      </div>
      <Carousel
        className='max-w-screen-md mx-auto'
        opts={{ dragFree: true, align: 'start' }}>
        <CarouselContent className='px-4'>
          {Array.from({ length: 8 }).map((image, index) => (
            <CarouselItem key={index} className='basis-32 sm:basis-36 lg:basis-40'>
              <Card className='p-2 grid min-h-28 shadow-sm'>
                <Skeleton className='bg-input/70' />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='top-36 left-4' />
        <CarouselNext className='top-36 right-4' />
      </Carousel>
    </div>
  );
}
