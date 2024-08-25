import { Skeleton } from "@/components/ui/skeleton";

export function SearchItemSkeleton() {
  return (
    <Skeleton className="my-2 flex items-center gap-4 bg-none p-2">
      <Skeleton className="size-12 rounded-md bg-muted-foreground/50" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-2 w-full rounded-md bg-muted-foreground/50"></Skeleton>
        <Skeleton className="h-2 w-3/4 rounded-md bg-muted-foreground/50"></Skeleton>
      </div>
    </Skeleton>
  );
}
