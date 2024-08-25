import { Skeleton } from "@/components/ui/skeleton";

export function FilterItemsSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <Skeleton className="h-4 w-20" />
      <div className="grid grid-cols-[repeat(2,minmax(auto,1fr))] gap-y-2 space-y-1 px-2 md:gap-x-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </section>
  );
}
