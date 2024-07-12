import { Suspense } from 'react';
import { SearchParams } from '@/lib/types';

import { Card } from '@/components/ui/card';
import { ProductsView } from './products_view';
import { ProductsViewSkeleton } from './_components/skeletons/products_view_skeleton';

type PageProps = {
  searchParams: SearchParams;
};

export default function ProductsPage({ searchParams }: PageProps) {
  return (
    <main className='min-h-screen max-w-screen-xl mx-auto bg-background'>
      <Card className='pb-8 rounded-none border-0 shadow-none'>
        <Suspense fallback={<ProductsViewSkeleton />}>
          <ProductsView searchParams={searchParams} />
        </Suspense>
      </Card>
    </main>
  );
}
