import { Skeleton } from '@/components/ui/skeleton';
import { ItemCarouselSkeleton } from '../_components/skeletons/item_carousel_skeleton';

export default function Loading() {
  return (
    <div className='max-view mx-auto bg-background'>
      <Skeleton className='h-14 w-full grid items-center px-10'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-16 bg-primary/10 rounded-full' />
          <Skeleton className='size-4 bg-primary/10 rounded-full' />
          <Skeleton className='h-4 w-16 bg-primary/10 rounded-full' />
          <Skeleton className='size-4 bg-primary/10 rounded-full' />
          <Skeleton className='h-4 w-16 bg-primary/10 rounded-full' />
        </div>
      </Skeleton>

      <div className='grid items-center pb-10 px-4 rounded-none lg:grid-cols-2 lg:gap-10'>
        <ItemCarouselSkeleton />

        <div className='space-y-6'>
          <div className='max-w-prose'>
            <Skeleton className='mb-8 h-6 w-20 rounded-full' />
            <div className='space-y-8'>
              <div className='space-y-1'>
                <Skeleton className='h-3 w-10/12' />
                <Skeleton className='h-3 w-full' />
                <Skeleton className='h-3 w-11/12' />
                <Skeleton className='h-3 w-full' />
                <Skeleton className='h-3 w-10/12' />
              </div>
              <div className='flex items-center gap-8'>
                <Skeleton className='h-5 w-32 rounded-full' />
                <Skeleton className='h-5 w-20 rounded-full' />
              </div>
              <div className='flex items-center justify-between gap-4'>
                <Skeleton className='h-5 w-20 rounded-full' />
                <div className='flex items-center gap-4'>
                  <Skeleton className='h-5 w-20 rounded-full' />
                  <Skeleton className='h-5 w-20 rounded-full' />
                </div>
              </div>
            </div>
          </div>

          <Skeleton className='h-1 w-full' />

          <div className='max-w-prose'>
            <div className='space-y-8'>
              <div className='flex items-center justify-between gap-4'>
                <Skeleton className='h-6 w-20 rounded-full' />
                <div className='flex items-center gap-8'>
                  <Skeleton className='h-8 w-20' />
                  <Skeleton className='size-10 rounded-full' />
                </div>
              </div>
            </div>
          </div>

          <div className='max-w-prose '>
            <div className='space-y-3'>
              <div className='flex items-center justify-between gap-4'>
                <Skeleton className='h-4 w-20 rounded-full' />
                <Skeleton className='size-4' />
              </div>
              <Skeleton className='h-1 w-full' />
              <div className='flex items-center justify-between gap-4'>
                <Skeleton className='h-4 w-20 rounded-full' />
                <Skeleton className='size-4' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
