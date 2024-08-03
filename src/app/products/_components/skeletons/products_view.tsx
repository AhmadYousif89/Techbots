import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { GridItemsSkeleton } from './grid_item';

export function ProductsViewSkeleton() {
  return (
    <>
      <div className='flex items-center justify-between h-14 px-4'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-2 w-12 bg-input/65' />
          <Skeleton className='h-2 w-2 bg-input/65' />
          <Skeleton className='h-2 w-12 bg-input/65' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-2 w-10 bg-input/65' />
          <Skeleton className='h-2 w-3 bg-input/65' />
          <Skeleton className='h-2 w-3 bg-input/65' />
          <Skeleton className='h-2 w-3 bg-input/65' />
          <Skeleton className='h-2 w-10 bg-input/65' />
        </div>
      </div>
      <Separator />
      <div className='flex items-center justify-between h-20 px-4'>
        <div className='flex items-center'>
          <Skeleton className='h-8 w-14 bg-input/80' />
          <Skeleton className='mx-4 h-10 w-1' />
          <Skeleton className='h-8 w-14 bg-input/70' />
        </div>
        <div className='flex items-center gap-8'>
          <Skeleton className='size-7 rounded-full bg-input/75' />
          <Skeleton className='h-8 w-14 bg-input/75' />
        </div>
      </div>
      <Separator />
      <div className='my-8'>
        <div className='flex items-center justify-between px-6'>
          <div className='hidden lg:flex items-center gap-4'>
            <Skeleton className='size-6 bg-input/80' />
            <Skeleton className='size-6 bg-input/80' />
            <Skeleton className='size-6 bg-input/80' />
          </div>
          <div className='flex items-center gap-4 ml-auto'>
            <Skeleton className='size-6 bg-input/70' />
            <Skeleton className='h-6 w-14 bg-input/70' />
            <Skeleton className='size-6 bg-input/70' />
          </div>
        </div>
      </div>

      <div
        className={`py-8 px-4 max-w-screen-lg mx-auto grid gap-8 justify-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`}>
        <GridItemsSkeleton />
      </div>
    </>
  );
}
