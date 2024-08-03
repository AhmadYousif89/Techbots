import { Skeleton } from '@/components/ui/skeleton';

export function DetailSkeleton() {
  return (
    <div className='space-y-6 px-4'>
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
  );
}
