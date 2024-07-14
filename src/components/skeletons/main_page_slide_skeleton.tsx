import { Skeleton } from '../ui/skeleton';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

export function MainPageSlideSkeleton() {
  return (
    <div className='bg-secondary py-10 px-6'>
      <div className='flex items-center gap-4 mb-12'>
        <Skeleton className='w-24 h-4 bg-input/80' />
        <Skeleton className='w-10 h-2 bg-input/80' />
      </div>

      <Carousel
        className='ml-4 max-w-80vw xl:max-w-screen-lg xl:mx-auto'
        opts={{ dragFree: true, align: 'start' }}>
        <CarouselContent>
          {Array.from({ length: 8 }).map((_, i) => (
            <CarouselItem key={i} className='basis-48 grid pb-4'>
              <Skeleton className='bg-background p-4 grid auto-rows-[1fr_auto] gap-4'>
                <Skeleton className='w-36 h-36 bg-input/70' />
                <div>
                  <Skeleton className='h-3 mb-1 bg-input ' />
                  <div className='flex items-center justify-between py-2'>
                    <Skeleton className='w-8 h-2 bg-input' />
                    <Skeleton className='w-16 h-2 bg-input' />
                  </div>
                </div>
              </Skeleton>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='flex justify-between'>
          <Skeleton className='rounded-full bg-input/80 size-10 top-full -translate-y-2 left-0' />
          <Skeleton className='rounded-full bg-input/80 size-10 top-full -translate-y-2 right-0' />
        </div>
      </Carousel>
    </div>
  );
}
