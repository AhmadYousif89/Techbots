import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export function CarouselSkeleton() {
  return (
    <div className="min-h-[600px] self-start pb-16 pt-10">
      <div className="mx-4">
        <Skeleton className="min-h-96 w-full bg-input/70" />
        <Skeleton className="my-8 h-1 w-full bg-input" />
      </div>
      <Carousel
        className="mx-auto max-w-screen-md"
        opts={{ dragFree: true, align: "start" }}
      >
        <CarouselContent className="px-4">
          {Array.from({ length: 8 }).map((image, index) => (
            <CarouselItem
              key={index}
              className="basis-32 sm:basis-36 lg:basis-40"
            >
              <Skeleton className="min-h-28"></Skeleton>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 flex justify-between px-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="size-10 rounded-full" />
        </div>
      </Carousel>
    </div>
  );
}
