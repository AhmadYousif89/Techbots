import { HomeSlider } from '@/components/slider';
import { FeaturedProducts } from '@/components/products/featured_products';
import { LatestBlogs } from '@/components/blogs/featured_blogs';

export default function Home() {
  return (
    <main className='min-h-svh max-w-screen-xl mx-auto'>
      <HomeSlider />
      <FeaturedProducts />
      <LatestBlogs />
    </main>
  );
}
