import { Suspense } from 'react';
import prisma from '@/lib/db';
import { capitalizeString, cn } from '@/lib/utils';
import { extractSearchParams } from '../_lib/utils';
import { Category, SearchParams, SortValue, TProduct } from '../_lib/types';

import { ProductGridSize } from './product_grid_size';
import { ProductGridItem } from './product_grid_item';
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
        'grid gap-8 grid-cols-2 lg:grid-cols-4 xl:col-[2] w-full xl:self-start',
        'py-8 px-4 xl:pr-8 xl:pl-0 max-w-screen-lg mx-auto xl:ml-auto xl:mr-0',
        'sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]',
        grid === '2' && 'lg:grid-cols-2',
        grid === '3' && 'lg:grid-cols-3',
        grid === '4' && 'lg:grid-cols-4'
      )}>
      <div className='flex items-center col-span-full'>
        <ProductGridSize />
        <ProductPaginationButtons {...searchParams} />
      </div>

      {/* Doesn't work when search params change?!  */}
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
      <p className='col-span-full text-xl text-center text-muted-foreground mt-8 font-medium'>
        Your filter didn't match any products.
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
    filter = {
      ...filter,
      AND: [
        ...(min ? [{ price: { gte: +min } }] : []),
        ...(max ? [{ price: { lte: +max } }] : [])
      ]
    };
  }

  return filter;
}

const getProducts = cache(
  async (searchParams: SearchParams) => {
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

    let products: TProduct[] = [];
    try {
      products = (await prisma.product.findMany(args)) as TProduct[];
    } catch (error) {
      console.error('Error fetching products:', error);
    }

    return products;
  },
  ['/products', 'getProducts'],
  { revalidate: day }
);
