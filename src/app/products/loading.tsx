import { ProductsViewSkeleton } from './_components/skeletons/products_view_skeleton';

export default function Loading() {
  return (
    <div className='min-h-screen max-view mx-auto bg-background'>
      <ProductsViewSkeleton />
    </div>
  );
}
