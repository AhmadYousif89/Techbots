import { FeaturedProducts } from '@/app/products/_components/featured_products';
import { LatestBlogs } from '@/app/blogs/_components/featured_blogs';
import { PopularItemsSlide } from '@/components/popular_items_slide';
import { TechDealsSlide } from '@/components/tech_deals_slide';
import { HomeSlider } from '@/components/slider';

export default function Home() {
  return (
    <main className='min-h-svh max-w-screen-xl mx-auto'>
      <HomeSlider />
      <FeaturedProducts />
      <PopularItemsSlide />
      <TechDealsSlide />
      <LatestBlogs />
    </main>
  );
}
