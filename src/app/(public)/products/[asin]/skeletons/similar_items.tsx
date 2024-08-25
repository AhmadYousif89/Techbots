import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from "@/components/ui/carousel";

export function SimilarItemSkeleton() {
  return (
    <div className="bg-background px-8 py-16">
      <Skeleton className="mb-8 h-8 w-56 rounded-full" />
      <div>
        <Carousel
          className="mx-auto max-w-[80vw] xl:max-w-screen-lg"
          opts={{ dragFree: true, align: "start" }}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="grid basis-48 pb-4">
                <Skeleton className="bg-secondary/50 p-2">
                  <Skeleton className="mb-2 min-h-36" />
                  <Skeleton className="my-2 h-4 w-full" />
                  <div className="flex items-center justify-between gap-4">
                    <Skeleton className="h-2.5 w-full" />
                    <Skeleton className="h-2.5 w-full" />
                  </div>
                </Skeleton>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex justify-between">
            <Skeleton className="size-8 rounded-full bg-input/70" />
            <Skeleton className="size-8 rounded-full bg-input/70" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
