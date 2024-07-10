import { Suspense } from 'react';
import { cn, extractSearchParams } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ProductGridSize } from './product_grid_size';
import { ProductGridItem } from './product_grid_item';
import PaginationButton from '@/components/pagination_button';
import { GridItemSkeleton } from './skeletons/grid_item_skeleton';
import { SearchParams } from '@/lib/types';
import { Product } from '../_actions/actions';

type ProductGridProps = {
  products: Product[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  searchParams: SearchParams;
};

export function ProductGrid({
  products,
  totalPages,
  hasNextPage,
  hasPrevPage,
  searchParams
}: ProductGridProps) {
  const { page, category, grid, limit, sort } = extractSearchParams(searchParams);
  const params = new URLSearchParams({ limit, category, sort, grid });

  return (
    <section
      className={cn(
        'py-8 px-4 max-w-screen-lg mx-auto',
        'grid gap-8 justify-center',
        'grid-cols-2',
        'sm:grid-cols-3',
        'lg:grid-cols-4',
        grid === '2' && 'lg:grid-cols-2',
        grid === '3' && 'lg:grid-cols-3',
        grid === '4' && 'lg:grid-cols-4'
      )}>
      <div className='flex items-center col-span-full'>
        <ProductGridSize />
        <div className='flex items-center gap-4 ml-auto'>
          <PaginationButton
            className='size-7'
            elementId='reviews'
            disabled={!hasPrevPage}
            href={`/products/?page=${+page - 1}&${params.toString()}`}>
            <ChevronLeft className='size-4' />
          </PaginationButton>
          <span className='text-foreground text-sm'>
            {page} / {totalPages}
          </span>
          <PaginationButton
            className='size-7'
            elementId='reviews'
            disabled={!hasNextPage}
            href={`/products/?page=${+page + 1}&${params.toString()}`}>
            <ChevronRight className='size-4' />
          </PaginationButton>
        </div>
      </div>

      {products.map((product, index) => (
        <Suspense key={product.asin + index} fallback={<GridItemSkeleton />}>
          <ProductGridItem
            key={product.asin}
            product={product}
            searchParams={searchParams}
          />
        </Suspense>
      ))}
    </section>
  );
}
