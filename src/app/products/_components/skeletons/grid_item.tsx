import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';

export function GridItemsSkeleton() {
  return (
    <div className='mt-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] col-span-full'>
      {Array.from({ length: 8 }).map((_, i) => (
        <Card
          key={i}
          className='grid justify-self-center py-2 px-4 rounded shadow-none border-0 ring-offset-4 hover:ring-1 hover:ring-muted'>
          <Skeleton className='size-32 mb-8 mx-auto bg-input/50' />
          <Skeleton className='h-1 w-full bg-input/75' />
          <CardHeader className='p-0 py-8'>
            <Skeleton className='h-2 w-full bg-input/50' />
            <Skeleton className='h-2 w-full bg-input/50' />
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
    </div>
  );
}
