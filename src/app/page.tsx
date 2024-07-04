import { HomeSlider } from '@/components/slider';
import { FeaturedProducts } from '@/components/products/featured_products';
import { LatestBlogs } from '@/components/blogs/featured_blogs';
import { PopularItemsSlide } from '@/components/popular_items_slide';
import { TechDealsSlide } from '@/components/tech_deals_slide';

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
