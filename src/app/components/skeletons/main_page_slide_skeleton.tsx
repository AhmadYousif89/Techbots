import { Skeleton } from "../../../components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";

export function MainPageSlideSkeleton() {
  return (
    <div className="bg-secondary px-6 py-10">
      <div className="mb-12 flex items-center gap-4">
        <Skeleton className="h-4 w-24 bg-input/80" />
        <Skeleton className="h-2 w-10 bg-input/80" />
      </div>

      <Carousel
        className="max-w-80vw ml-4 xl:mx-auto xl:max-w-screen-lg"
        opts={{ dragFree: true, align: "start" }}
      >
        <CarouselContent>
          {Array.from({ length: 8 }).map((_, i) => (
            <CarouselItem key={i} className="grid basis-48 pb-4">
              <Skeleton className="grid auto-rows-[1fr_auto] gap-4 bg-background p-4">
                <Skeleton className="h-36 w-36 bg-input/70" />
                <div>
                  <Skeleton className="mb-1 h-3 bg-input" />
                  <div className="flex items-center justify-between py-2">
                    <Skeleton className="h-2 w-8 bg-input" />
                    <Skeleton className="h-2 w-16 bg-input" />
                  </div>
                </div>
              </Skeleton>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-between">
          <Skeleton className="left-0 top-full size-10 -translate-y-2 rounded-full bg-input/80" />
          <Skeleton className="right-0 top-full size-10 -translate-y-2 rounded-full bg-input/80" />
        </div>
      </Carousel>
    </div>
  );
}
