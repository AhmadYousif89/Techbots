import { Skeleton } from "@/components/ui/skeleton";

export function ReviewSkeleton() {
  return (
    <div className="flex flex-col gap-8 bg-card px-8 pb-10 pt-16 lg:flex-row lg:justify-between lg:px-16">
      <div className="grid flex-1 gap-4 lg:basis-1/2 lg:self-start">
        <Skeleton className="mb-4 h-8 w-48 rounded-lg" />

        <div className="flex max-w-32 flex-col items-center justify-between gap-2 rounded-lg border border-input p-4">
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="h-2 w-full rounded-full px-4" />
          <Skeleton className="h-2 w-full rounded-full px-4" />
        </div>

        <div className="mb-4 grid w-full max-w-sm gap-4 rounded-lg border border-input p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="aspect-square size-5 rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="aspect-square size-5 rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="aspect-square size-5 rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="aspect-square size-5 rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="aspect-square size-5 rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between rounded-lg border border-input p-6 lg:mt-16 lg:basis-full">
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-28 rounded-full" />

            <div className="flex items-center gap-2">
              <Skeleton className="aspect-square size-4 rounded-full" />
              <Skeleton className="aspect-square size-4 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="aspect-square size-4 rounded-full" />
              <Skeleton className="aspect-square size-4 rounded-full" />
            </div>
          </div>

          {Array.from({ length: 3 }).map((_, i) => (
            <article key={i} className="space-y-6 py-6">
              <div className="flex flex-col">
                <div className="flex gap-4 p-0">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Skeleton className="h-2 w-20 rounded-full" />
                      <Skeleton className="h-2 w-28 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-4 rounded-full" />
                      <Skeleton className="size-4 rounded-full" />
                      <Skeleton className="size-4 rounded-full" />
                      <Skeleton className="size-4 rounded-full" />
                      <Skeleton className="size-4 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pl-6">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-2 w-[90%] rounded-full" />
                <Skeleton className="h-2 w-[80%] rounded-full" />
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-2 w-[75%] rounded-full" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
