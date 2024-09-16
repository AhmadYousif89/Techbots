import { Skeleton } from "@/components/ui/skeleton";

export function SearchItemSkeleton() {
  return (
    <div className="p-4">
      <Skeleton className="mb-6 h-5 w-32" />

      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 pb-3"
        >
          <Skeleton className="h-12 w-16" />
          <div className="size-full space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
