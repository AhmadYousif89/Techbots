import { Skeleton } from '@/components/ui/skeleton';

export function ReviewSkeleton() {
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between gap-8 bg-card pt-20 pb-10 px-8 lg:px-16'>
      <div className='grid gap-4 flex-1 lg:basis-1/2 lg:self-start'>
        <Skeleton className='h-6 w-60 mb-4 rounded-full' />

        <div className='flex flex-col items-center justify-between gap-2 max-w-32 p-4 rounded-lg border border-input'>
          <Skeleton className='size-16 rounded-full' />
          <Skeleton className='h-2 w-full px-4 rounded-full' />
          <Skeleton className='h-2 w-full px-4 rounded-full' />
        </div>

        <div className='grid gap-4 max-w-sm p-4 mb-4 rounded-lg border border-input w-full'>
          <div className='flex items-center gap-2'>
            <Skeleton className='size-5 aspect-square rounded-full' />
            <Skeleton className='h-4 w-full rounded-full' />
            <Skeleton className='h-4 w-16 rounded-full' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='size-5 aspect-square rounded-full' />
            <Skeleton className='h-4 w-full rounded-full' />
            <Skeleton className='h-4 w-16 rounded-full' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='size-5 aspect-square rounded-full' />
            <Skeleton className='h-4 w-full rounded-full' />
            <Skeleton className='h-4 w-16 rounded-full' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='size-5 aspect-square rounded-full' />
            <Skeleton className='h-4 w-full rounded-full' />
            <Skeleton className='h-4 w-16 rounded-full' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='size-5 aspect-square rounded-full' />
            <Skeleton className='h-4 w-full rounded-full' />
            <Skeleton className='h-4 w-16 rounded-full' />
          </div>
        </div>
      </div>

      <div className='p-6 lg:mt-16 flex-1 lg:basis-full flex flex-col justify-between border border-input rounded-lg'>
        <div className='space-y-12'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-6 w-28 rounded-full' />

            <div className='flex items-center gap-2'>
              <Skeleton className='size-4 aspect-square rounded-full' />
              <Skeleton className='size-4 aspect-square rounded-full' />
              <Skeleton className='h-6 w-12 rounded-full' />
              <Skeleton className='size-4 aspect-square rounded-full' />
              <Skeleton className='size-4 aspect-square rounded-full' />
            </div>
          </div>

          {Array.from({ length: 3 }).map((_, i) => (
            <article className='space-y-6'>
              <div className='flex flex-col'>
                <div className='flex p-0 gap-4'>
                  <Skeleton className='size-10 rounded-full' />
                  <div className='space-y-2'>
                    <div className='space-y-2'>
                      <Skeleton className='h-2 w-20 rounded-full' />
                      <Skeleton className='h-2 w-28 rounded-full' />
                    </div>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='size-4 rounded-full' />
                      <Skeleton className='size-4 rounded-full' />
                      <Skeleton className='size-4 rounded-full' />
                      <Skeleton className='size-4 rounded-full' />
                      <Skeleton className='size-4 rounded-full' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-2 pl-6'>
                <Skeleton className='h-2 w-full rounded-full' />
                <Skeleton className='h-2 w-[90%] rounded-full' />
                <Skeleton className='h-2 w-[80%] rounded-full' />
                <Skeleton className='h-2 w-full rounded-full' />
                <Skeleton className='h-2 w-[75%] rounded-full' />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
