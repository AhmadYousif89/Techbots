import { Product } from '@/lib/types';
import { useLocalStorage } from '../hooks/use_local_storage';
import { ProductThumbnail } from '../products/product_thumpnail';

export function WishlistItems() {
  const [wishlistItems] = useLocalStorage<Product[]>('wishlist', []);

  return (
    <section className='grid sm:flex sm:flex-col gap-4 overflow-y-auto max-h-72 sm:max-h-screen p-4 sm:px-0'>
      {wishlistItems.map((product, index) => (
        <ProductThumbnail key={index} product={product} type='wishlist' />
      ))}
    </section>
  );
}
