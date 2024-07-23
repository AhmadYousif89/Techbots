import prisma from '@/lib/db';
import { Suspense } from 'react';
import { cache } from '@/lib/cache';
import { capitalizeString, cn } from '@/lib/utils';
import { extractSearchParams } from '../_lib/utils';
import { Category, SearchParams, SortValue, TProduct } from '../_lib/types';

import { ProductGridSize } from './product_grid_size';
import { ProductGridItem } from './product_grid_item';
import { GridItemsSkeleton } from './skeletons/grid_item_skeleton';
import { ProductPaginationButtons } from './product_pagination_buttons';
import { Ban } from 'lucide-react';

type ProductGridProps = {
  searchParams: SearchParams;
};

export async function ProductGrid({ searchParams }: ProductGridProps) {
  const { grid } = extractSearchParams(searchParams);

  return (
    <section
      className={cn(
        'h-full',
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
      <div className='relative text-center col-span-full place-self-center grid'>
        <p className='z-[1] text-xl lg:text-2xl text-center text-muted-foreground tracking-wider mt-8 font-semibold'>
          No Products Found!
        </p>
        <Ban className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mx-auto mt-4 size-36 lg:size-72 stroke-[1] text-input' />
      </div>
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
        ...(max ? [{ price: { lte: +max } }] : []),
      ],
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
    const sortOptions: Omit<SortOptions, 'reset'> = {
      popular: { rating: 'desc' },
      newest: { createdAt: 'desc' },
      'lowest-price': { price: 'asc' },
      'highest-price': { price: 'desc' },
    };

    const args: {
      orderBy: Record<string, 'asc' | 'desc'>;
      take: number;
      skip: number;
      where?: any;
    } = {
      orderBy: sort ? sortOptions[sort as keyof typeof sortOptions] : { brand: 'asc' },
      take: +limit,
      skip: start,
    };

    if (Object.values(filter).length > 0) {
      args.where = filter;
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
