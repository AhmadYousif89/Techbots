import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export function GridItemSkeleton({ grid }: { grid: string }) {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <Card
          key={i}
          className={cn(
            "flex flex-col justify-end justify-self-center",
            "overflow-hidden rounded border-0 px-4 py-2 shadow-none",
            "max-w-48 ring-1 ring-muted ring-offset-4 max-[380px]:min-w-60",
          )}
        >
          <Skeleton
            className={cn(
              "mb-4 size-28 place-self-center",
              grid === "3" && "size-36 p-0",
              grid === "2" && "size-44 p-2",
              grid === "1" && "size-40",
            )}
          />
          <Skeleton className="h-px w-full bg-input/75" />
          <CardHeader className={cn("p-0 py-8 xl:min-w-52")}>
            <Skeleton className="h-2 w-full bg-input/50" />
            <Skeleton className="h-2 w-full bg-input/50" />
            <Skeleton className="h-2 w-full bg-input/50" />
            <Skeleton className="h-2 w-3/4 bg-input/50" />
            <Skeleton className="h-2 w-full bg-input/50" />
            <Skeleton className="h-2 w-1/2 bg-input/50" />
          </CardHeader>
          <Skeleton className="h-px w-full bg-input/75" />
          <CardFooter className="mt-4 justify-between gap-4 p-0">
            <Skeleton className="h-8 w-20 rounded bg-input/50" />
            <Skeleton className="size-7 rounded-full bg-input/50" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
