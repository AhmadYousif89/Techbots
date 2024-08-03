import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { GridItemsSkeleton } from './grid_item';

export function ProductsViewSkeleton({ grid }: { grid: string }) {
  return (
    <main className='group min-h-screen max-view mx-auto bg-background'>
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
      <div className='flex items-center justify-between h-20 px-4 xl:hidden'>
        <div className='flex items-center'>
          <Skeleton className='h-8 w-14' />
          <Skeleton className='mx-4 h-10 w-1' />
          <Skeleton className='h-8 w-14 bg-input/70' />
        </div>
        <div className='flex items-center gap-8'>
          <Skeleton className='size-7 rounded-full bg-input/75' />
          <Skeleton className='h-8 w-14 bg-input/75' />
        </div>
      </div>
      <Separator />

      <div className='my-4 lg:px-6 py-8 xl:flex xl:justify-between xl:gap-16'>
        {/* Filters */}
        <div className='space-y-8 min-w-72 hidden xl:block'>
          {/* FilterBtn & Sort */}
          <div className='flex items-center justify-between gap-8 pr-6'>
            <Skeleton className='h-6 w-20' />
            <Skeleton className='h-6 w-20' />
          </div>
          {/* Brands */}
          <div className='py-6 grid grid-cols-[repeat(auto-fit,minmax(120px,auto))] gap-2 space-y-1 xl:grid-cols-[minmax(120px,auto),auto] xl:gap-x-0'>
            <Skeleton className='h-4 w-28 col-span-full mb-4' />
            {[...Array(30)].map((_, i) => (
              <div key={i} className='pl-4 flex items-center gap-2'>
                <Skeleton className='size-4' />
                <Skeleton className='h-4 w-20' />
              </div>
            ))}
          </div>
          <Skeleton className='h-px w-full col-span-full' />
          {/* Prices */}
          <div className='pt-6'>
            <Skeleton className='h-4 w-28 col-span-full mb-4' />
            <div className='space-y-4'>
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-6 w-3/4' />
            </div>
            <Skeleton className='h-8 w-20 mt-4' />
          </div>
        </div>
        {/* Grid & Paginations */}
        <div className='flex-grow max-w-screen-lg mx-auto'>
          <div className='flex items-center justify-between px-6'>
            <div className='hidden lg:flex items-center gap-4'>
              <Skeleton className='size-6' />
              <Skeleton className='size-6' />
              <Skeleton className='size-6' />
            </div>
            <div className='flex items-center gap-4 ml-auto'>
              <Skeleton className='size-6 bg-input/70' />
              <Skeleton className='h-6 w-14 bg-input/70' />
              <Skeleton className='size-6 bg-input/70' />
            </div>
          </div>

          <div
            className={`grid gap-8 grid-cols-2 grid-rows-[auto,1fr] lg:grid-cols-4 xl:col-[2] w-full xl:self-start py-8 px-4 xl:pr-8 xl:pl-0 xl:pt-20 max-w-screen-lg mx-auto xl:ml-auto xl:mr-0 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]`}>
            <GridItemsSkeleton grid={grid} />
          </div>
        </div>
      </div>
    </main>
  );
}
