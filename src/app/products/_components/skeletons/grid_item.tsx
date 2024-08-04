import { cn } from "@/app/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export function GridItemsSkeleton({ grid }: { grid: string }) {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <Card
          key={i}
          className="grid max-w-xs auto-rows-[150px_3px_1fr_3px_auto] justify-self-center rounded border-0 px-4 py-2 shadow-none ring-offset-4 hover:ring-1 hover:ring-muted md:auto-rows-[200px_3px_1fr_3px_auto]"
        >
          <Skeleton
            className={cn(
              "size-28 place-self-center",
              grid === "3" && "p-0 lg:size-36",
              grid === "2" && "p-2 lg:size-44",
            )}
          />
          <Skeleton className="h-px w-full bg-input/75" />
          <CardHeader className="min-w-40 p-0 py-8 xl:min-w-52">
            <Skeleton className="h-2 w-full bg-input/50" />
            <Skeleton className="h-2 w-full bg-input/50" />
            <Skeleton className="h-2 w-full bg-input/50" />
            <Skeleton className="h-2 w-3/4 bg-input/50" />
            <Skeleton className="h-2 w-full bg-input/50" />
            <Skeleton className="h-2 w-1/2 bg-input/50" />
          </CardHeader>
          <Skeleton className="mb-2 h-px w-full bg-input/75" />
          <CardFooter className="justify-between gap-4 p-0">
            <Skeleton className="h-8 w-20 rounded bg-input/50" />
            <Skeleton className="size-7 rounded-full bg-input/50" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
