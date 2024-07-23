import { Suspense } from 'react';

import { ProductsView } from './products_view';
import { SearchParams } from '@/app/products/_lib/types';
import { ProductsViewSkeleton } from './_components/skeletons/products_view_skeleton';

type PageProps = {
  searchParams: SearchParams;
};

export default function ProductsPage({ searchParams }: PageProps) {
  return (
    <main className='min-h-screen max-view mx-auto bg-background'>
      <Suspense fallback={<ProductsViewSkeleton />}>
        <ProductsView searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
