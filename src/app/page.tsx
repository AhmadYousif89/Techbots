import { HomeSlider } from '@/components/slider';
import { FeaturedProducts } from '@/components/products/featured_products';
import { FeaturedBlogs } from '@/components/blogs/featured_blogs';

export default function Home() {
  return (
    <main className='min-h-svh'>
      <HomeSlider />
      <FeaturedProducts />
      <FeaturedBlogs />
    </main>
  );
}
