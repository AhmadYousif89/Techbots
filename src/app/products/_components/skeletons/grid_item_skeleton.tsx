import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function GridItemsSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <Card
          key={i}
          className='grid auto-rows-[170px_3px_1fr_3px_1fr] p-2 shadow-none border-0'>
          <Skeleton className='size-28 sm:size-36 mx-auto bg-input/50' />
          <Skeleton className='h-1 w-full bg-input/75' />
          <CardHeader className='p-0 py-4'>
            <Skeleton className='h-2 w-full bg-input/50' />
            <Skeleton className='h-2 w-3/4 bg-input/50' />
            <Skeleton className='h-2 w-full bg-input/50' />
            <Skeleton className='h-2 w-1/2 bg-input/50' />
          </CardHeader>
          <Skeleton className='h-1 w-full bg-input/75' />
          <CardFooter className='p-0 pt-4 gap-4 justify-between'>
            <Skeleton className='rounded w-20 h-8 bg-input/50' />
            <Skeleton className='rounded-full size-7 bg-input/50' />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
