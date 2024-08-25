import { Skeleton } from "@/components/ui/skeleton";

export function BreadcrumbSkeleton() {
  return (
    <Skeleton className="grid h-14 w-full animate-none items-center rounded-none bg-muted px-10">
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
    </Skeleton>
  );
}
