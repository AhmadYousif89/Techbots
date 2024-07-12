import prisma from '@/lib/db';
import { Suspense } from 'react';
import { SearchParams } from '@/lib/types';
import { cn, extractSearchParams } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ProductGridSize } from './product_grid_size';
import { ProductGridItem } from './product_grid_item';
import PaginationButton from '@/components/pagination_button';
import { GridItemsSkeleton } from './skeletons/grid_item_skeleton';
import { Product, getFilteredProducts, getProducts } from '../_actions/actions';

type ProductGridProps = {
  searchParams: SearchParams;
};

export async function ProductGrid({ searchParams }: ProductGridProps) {
  const { page, limit, category, sort, min, max, grid } =
    extractSearchParams(searchParams);

  const totalCount = await prisma.product.count();
  const totalPages = Math.ceil(totalCount / +limit);
  const start = (+page - 1) * +limit;
  const end = start + +limit;
  const hasNextPage = end < totalCount;
  const hasPrevPage = start > 0;
  const params = new URLSearchParams({ limit, category, sort, min, max, grid });

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
        <div className='flex items-center justify-center gap-4 ml-auto'>
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

      <Suspense fallback={<GridItemsSkeleton />}>
        <DisplayProductsGrid searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function DisplayProductsGrid({ searchParams }: { searchParams: SearchParams }) {
  const { products } = await getFilteredProducts({ searchParams });
  return (
    <>
      {products.map((product, index) => (
        <ProductGridItem
          key={product.asin + index}
          searchParams={searchParams}
          product={product}
        />
      ))}
    </>
  );
}
