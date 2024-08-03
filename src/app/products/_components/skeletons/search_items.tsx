import { Skeleton } from '@/components/ui/skeleton';

export function SearchItemSkeleton() {
  return (
    <Skeleton className='my-2 p-2 bg-none flex items-center gap-4'>
      <Skeleton className='size-12 rounded-md bg-muted-foreground/50' />
      <div className='grid gap-2 flex-1'>
        <Skeleton className='w-full h-2 rounded-md bg-muted-foreground/50'></Skeleton>
        <Skeleton className='w-3/4 h-2 rounded-md bg-muted-foreground/50'></Skeleton>
      </div>
    </Skeleton>
  );
}
