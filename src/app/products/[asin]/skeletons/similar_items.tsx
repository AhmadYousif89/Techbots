import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselItem, CarouselContent } from '@/components/ui/carousel';

export function SimilarItemSkeleton() {
  return (
    <div className='bg-background px-8 py-16'>
      <Skeleton className='w-56 h-8 rounded-full mb-8' />
      <div>
        <Carousel
          className='mx-auto max-w-[80vw] xl:max-w-screen-lg'
          opts={{ dragFree: true, align: 'start' }}>
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className='basis-48 grid pb-4'>
                <Skeleton className='bg-secondary/50 p-2 '>
                  <Skeleton className='min-h-36 mb-2' />
                  <Skeleton className='w-full h-4 my-2' />
                  <div className='flex justify-between gap-4 items-center'>
                    <Skeleton className='w-full h-2.5' />
                    <Skeleton className='w-full h-2.5' />
                  </div>
                </Skeleton>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='flex justify-between mt-4'>
            <Skeleton className='rounded-full bg-input/70 size-8' />
            <Skeleton className='rounded-full bg-input/70 size-8' />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
