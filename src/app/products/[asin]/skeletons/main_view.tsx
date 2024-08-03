import { CarouselSkeleton } from './carousel';
import { DetailSkeleton } from './details';

export function ProductDetailSkeleton() {
  return (
    <div className='max-view mx-auto bg-card w-full'>
      <div className='grid items-center pb-10 px-4 rounded-none lg:grid-cols-2 lg:gap-10'>
        <CarouselSkeleton />
        <DetailSkeleton />
      </div>
    </div>
  );
}
