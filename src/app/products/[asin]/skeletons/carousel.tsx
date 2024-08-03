import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export function CarouselSkeleton() {
  return (
    <div className='min-h-[600px] self-start pt-10 pb-16'>
      <div className='mx-4'>
        <Skeleton className='min-h-96 w-full bg-input/70' />
        <Skeleton className='w-full h-1 my-8 bg-input' />
      </div>
      <Carousel
        className='max-w-screen-md mx-auto'
        opts={{ dragFree: true, align: 'start' }}>
        <CarouselContent className='px-4'>
          {Array.from({ length: 8 }).map((image, index) => (
            <CarouselItem key={index} className='basis-32 sm:basis-36 lg:basis-40'>
              <Skeleton className='min-h-28'></Skeleton>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='flex justify-between mt-4 px-4'>
          <Skeleton className='rounded-full size-10' />
          <Skeleton className='rounded-full size-10' />
        </div>
      </Carousel>
    </div>
  );
}
