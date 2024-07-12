import { HotProducts } from '@/app/hot_products';
import { LatestBlogs } from '@/app/featured_blogs';
import { PopularItemsSlide } from '@/app/popular_items_slide';
import { TechDealsSlide } from '@/app/tech_deals_slide';
import { HomeSlider } from '@/components/slider';

export default function Home() {
  return (
    <main className='min-h-svh max-w-screen-xl mx-auto'>
      <HomeSlider />
      <HotProducts />
      <PopularItemsSlide />
      <TechDealsSlide />
      <LatestBlogs />
    </main>
  );
}
