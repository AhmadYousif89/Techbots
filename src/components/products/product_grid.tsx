import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ProductGridSize } from './product_grid_size';
import { ProductGridItem } from './product_grid_item';
import PaginationButton from '../pagination_button';
import { GridItemSkeleton } from './skeletons/grid_item_skeleton';

type ProductGridProps = {
  products: Product[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  category: string;
  totalPages: number;
  page: number;
  limit: string;
  gridSize: string;
};

export async function ProductGrid({
  products,
  page,
  limit,
  gridSize,
  category,
  totalPages,
  hasNextPage,
  hasPrevPage
}: ProductGridProps) {
  return (
    <section
      className={cn(
        'py-8 px-4 max-w-screen-lg mx-auto',
        'grid gap-8 justify-center',
        'grid-cols-2',
        'sm:grid-cols-3',
        'lg:grid-cols-4',
        gridSize === '2' && 'lg:grid-cols-2',
        gridSize === '3' && 'lg:grid-cols-3',
        gridSize === '4' && 'lg:grid-cols-4'
      )}>
      <div className='flex items-center col-span-full'>
        <ProductGridSize />
        <div className='flex items-center gap-4 ml-auto'>
          <PaginationButton
            className='size-7'
            elementId='reviews'
            disabled={!hasPrevPage}
            href={`/products/?page=${
              +page - 1
            }&limit=${limit}&category=${category}&grid=${gridSize}`}>
            <ChevronLeft className='size-4' />
          </PaginationButton>
          <span className='text-foreground text-sm'>
            {page} / {totalPages}
          </span>
          <PaginationButton
            className='size-7'
            elementId='reviews'
            disabled={!hasNextPage}
            href={`/products/?page=${
              +page + 1
            }&limit=${limit}&category=${category}&grid=${gridSize}`}>
            <ChevronRight className='size-4' />
          </PaginationButton>
        </div>
      </div>

      {products.map((product, index) => (
        <Suspense key={product.asin + index} fallback={<GridItemSkeleton />}>
          <ProductGridItem key={product.asin} product={product} />
        </Suspense>
      ))}
    </section>
  );
}
