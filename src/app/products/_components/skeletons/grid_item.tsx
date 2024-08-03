import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';

export function GridItemsSkeleton({ grid }: { grid: string }) {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <Card
          key={i}
          className='grid auto-rows-[150px_3px_1fr_3px_auto] md:auto-rows-[200px_3px_1fr_3px_auto] justify-self-center py-2 px-4 rounded shadow-none border-0 max-w-xs ring-offset-4 hover:ring-1 hover:ring-muted'>
          <Skeleton
            className={cn(
              'size-28 place-self-center',
              grid === '3' && 'lg:size-36 p-0',
              grid === '2' && 'lg:size-44 p-2'
            )}
          />
          <Skeleton className='h-px w-full bg-input/75' />
          <CardHeader className='p-0 py-8 min-w-40 xl:min-w-52'>
            <Skeleton className='h-2 w-full bg-input/50' />
            <Skeleton className='h-2 w-full bg-input/50' />
            <Skeleton className='h-2 w-full bg-input/50' />
            <Skeleton className='h-2 w-3/4 bg-input/50' />
            <Skeleton className='h-2 w-full bg-input/50' />
            <Skeleton className='h-2 w-1/2 bg-input/50' />
          </CardHeader>
          <Skeleton className='h-px w-full bg-input/75 mb-2' />
          <CardFooter className='p-0 gap-4 justify-between'>
            <Skeleton className='rounded w-20 h-8 bg-input/50' />
            <Skeleton className='rounded-full size-7 bg-input/50' />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
