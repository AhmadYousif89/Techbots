import { Skeleton } from '@/components/ui/skeleton';

export function FilterItemsSkeleton() {
  return (
    <section className='flex flex-col gap-4 py-8'>
      <Skeleton className='w-20 h-4' />
      <div className='px-2 grid grid-cols-[repeat(2,minmax(auto,1fr))] gap-y-2 md:gap-x-8 space-y-1'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className='flex items-center gap-2'>
            <Skeleton className='w-4 h-4' />
            <Skeleton className='w-20 h-4' />
          </div>
        ))}
      </div>
    </section>
  );
}
