import { Skeleton } from '@/components/ui/skeleton';

export function BreadcrumbSkeleton() {
  return (
    <Skeleton className='h-14 w-full bg-muted animate-none grid items-center px-10 rounded-none'>
      <div className='flex items-center gap-4'>
        <Skeleton className='h-4 w-16 rounded-full' />
        <Skeleton className='size-4 rounded-full' />
        <Skeleton className='h-4 w-16 rounded-full' />
        <Skeleton className='size-4 rounded-full' />
        <Skeleton className='h-4 w-16 rounded-full' />
      </div>
    </Skeleton>
  );
}
