import { DetailSkeleton } from "./details";
import { CarouselSkeleton } from "../../_components/skeletons/carousel";

export function ProductDetailSkeleton() {
  return (
    <div className="max-view mx-auto w-full bg-card">
      <div className="grid items-center rounded-none px-4 pb-10 lg:grid-cols-2 lg:gap-10">
        <CarouselSkeleton />
        <DetailSkeleton />
      </div>
    </div>
  );
}
