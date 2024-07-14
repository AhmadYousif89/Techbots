import { HotProducts } from '@/app/hot_products';
import { LatestBlogs } from '@/app/featured_blogs';
import { PopularItemsSlide } from '@/app/popular_items_slide';
import { TechDealsSlide } from '@/app/tech_deals_slide';
import { HomeSlider } from '@/components/slider';
import { Suspense } from 'react';
import { MainPageSlideSkeleton } from '@/components/skeletons/main_page_slide_skeleton';

export default function Home() {
  return (
    <main className='min-h-svh max-w-screen-xl mx-auto'>
      <HomeSlider />
      <HotProducts />
      <Suspense fallback={<MainPageSlideSkeleton />}>
        <PopularItemsSlide />
      </Suspense>
      <Suspense fallback={<MainPageSlideSkeleton />}>
        <TechDealsSlide />
      </Suspense>
      <LatestBlogs />
    </main>
  );
}
