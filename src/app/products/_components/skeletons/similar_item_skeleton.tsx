import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselItem, CarouselContent } from '@/components/ui/carousel';

export function SimilarItemSkeleton() {
  return (
    <div className='bg-background p-8 '>
      <Skeleton className='w-1/2 h-4 bg-input/80 mb-8' />
      <div>
        <Carousel
          className='mx-auto max-w-[80vw] xl:max-w-screen-lg'
          opts={{ dragFree: true, align: 'start' }}>
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className='basis-48 grid pb-4'>
                <Card className='p-2 grid min-h-44 border-muted shadow-sm'>
                  <Skeleton className='min-h-36 mb-2 bg-input/80' />
                  <Skeleton className='w-full h-4 my-2  bg-input/70' />
                  <div className='flex justify-between gap-4 items-center'>
                    <Skeleton className='w-full h-2.5  bg-input/70' />
                    <Skeleton className='w-full h-2.5 bg-input/80' />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='flex justify-between mt-4'>
            <Skeleton className='rounded-full bg-input/80 size-8' />
            <Skeleton className='rounded-full bg-input/80 size-8' />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
