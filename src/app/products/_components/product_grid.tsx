import { Suspense } from 'react';
import prisma from '@/lib/db';
import { capitalizeString, cn } from '@/lib/utils';
import { extractSearchParams } from '../_lib/utils';
import { Category, SearchParams, SortValue, TProduct } from '../_lib/types';

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
        'xl:absolute xl:top-[65px] xl:right-2',
        'py-8 px-4 max-w-screen-lg ml-auto',
        'grid gap-8 grid-cols-2',
        'sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]',
        grid === '2' && 'lg:grid-cols-2',
        grid === '3' && 'lg:grid-cols-3',
        grid === '4' && 'lg:grid-cols-4'
      )}>
      <div className='flex items-center col-span-full'>
        <ProductGridSize />
        {/* <PaginationSummary className='sm:hidden' searchParams={searchParams} /> */}
        <ProductPaginationButtons {...searchParams} />
      </div>

      <Suspense fallback={<GridItemsSkeleton />}>
        <DisplayProductsGrid {...searchParams} />
      </Suspense>
    </section>
  );
}

async function DisplayProductsGrid(searchParams: SearchParams) {
  const products = await getProducts(searchParams);

  if (!products.length) {
    return (
      <p className='col-span-full text-xl text-center text-muted-foreground'>
        No products found
      </p>
    );
  }

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

export function getFilters(searchParams: SearchParams) {
  const { category, brand, min, max } = extractSearchParams(searchParams);

  type Filter = { [k: string]: any };
  let filter: Filter = category ? { category } : {};
  if (brand && brand.includes(',')) {
    const list = brand.split(',').map(item => item);
    filter = { ...filter, brand: { in: list } };
  } else if (brand) {
    filter = { ...filter, brand };
  }
  if (min || max) {
    filter = { ...filter, AND: [{ price: { gte: +min } }, { price: { lte: +max } }] };
  }

  return filter;
}

const getProducts = async (searchParams: SearchParams) => {
  const { page, limit, sort } = extractSearchParams(searchParams);
  const filter = getFilters(searchParams);
  const start = (+page - 1) * +limit;

  type SortOptions = Record<Exclude<SortValue, ''>, Record<string, 'asc' | 'desc'>>;
  const sortOptions: SortOptions = {
    popular: { rating: 'desc' },
    newest: { createdAt: 'desc' },
    'lowest-price': { price: 'asc' },
    'highest-price': { price: 'desc' }
  };
  console.log('filter', filter);
  let args = {};
  if (Object.values(filter) && Object.values(filter).length > 0) {
    args = {
      where: filter,
      orderBy: sort ? sortOptions[sort as keyof typeof sortOptions] : { brand: 'asc' },
      take: +limit,
      skip: start
    };
  } else {
    args = {
      orderBy: sort ? sortOptions[sort as keyof typeof sortOptions] : { brand: 'asc' },
      take: +limit,
      skip: start
    };
  }

  const products = await prisma.product.findMany(args);

  return products as TProduct[];
};
