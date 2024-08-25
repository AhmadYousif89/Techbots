import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export function CarouselSkeleton() {
  return (
    <div className="self-start pb-16 pt-10 lg:min-h-[700px]">
      <div className="mx-4">
        <Skeleton className="size-full min-h-80 bg-input/70 lg:mx-auto lg:min-h-96 lg:max-w-lg" />
        <Skeleton className="my-8 h-1 w-full bg-input" />
      </div>
      <div className="mx-auto max-w-screen-md">
        <Carousel opts={{ dragFree: true, align: "start" }}>
          <CarouselContent className="py-4 pl-4">
            {Array.from({ length: 10 }).map((image, index) => (
              <CarouselItem key={index} className="basis-28">
                <div className="h-20">
                  <Skeleton className="size-full" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex justify-between px-4">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="size-9 rounded-full" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
