import { Suspense } from 'react';
import prisma from '@/lib/db';
import { cn } from '@/lib/utils';
import { extractSearchParams } from '../_lib/utils';
import { SearchParams, SortValue, TProduct } from '../_lib/types';

import { ProductGridSize } from './product_grid_size';
import { ProductGridItem } from './product_grid_item';
import { PaginationSummary } from './pagination_summary';
import { GridItemsSkeleton } from './skeletons/grid_item_skeleton';
import { ProductPaginationButtons } from './product_pagination_buttons';
import { cache } from '@/lib/cache';

type ProductGridProps = {
  searchParams: SearchParams;
};

export async function ProductGrid({ searchParams }: ProductGridProps) {
  const { grid } = extractSearchParams(searchParams);

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
        <PaginationSummary className='sm:hidden' searchParams={searchParams} />
        <ProductPaginationButtons {...searchParams} />
      </div>

      <Suspense fallback={<GridItemsSkeleton />}>
        <DisplayProductsGrid {...searchParams} />
      </Suspense>
    </section>
  );
}

async function DisplayProductsGrid(searchParams: SearchParams) {
  const products = await getProductsGrid(searchParams);

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

const day = 60 * 60 * 24;

const getProductsGrid = cache(
  async (searchParams: SearchParams) => {
    const { page, limit, category, sort } = extractSearchParams(searchParams);
    const start = (+page - 1) * +limit;
    const end = start + +limit;

    const sortOptions: Record<Exclude<SortValue, ''>, Record<string, 'asc' | 'desc'>> = {
      popular: { rating: 'desc' },
      newest: { createdAt: 'desc' },
      'lowest-price': { price: 'asc' },
      'highest-price': { price: 'desc' }
    };

    const products = await prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: sort ? sortOptions[sort as keyof typeof sortOptions] : { brand: 'asc' },
      take: +limit,
      skip: start
    });

    return products as TProduct[];
  },
  ['/products', 'getProductsGrid'],
  { revalidate: day }
);
