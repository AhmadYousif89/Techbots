import prisma from '@/lib/db';
import { Suspense } from 'react';
import { Ban } from 'lucide-react';
import { cache } from '@/lib/cache';
import { redirect } from 'next/navigation';
import { capitalizeString, cn } from '@/lib/utils';
import { extractSearchParams } from '../_lib/utils';
import { Category, SearchParams, SortValue, TProduct } from '../_lib/types';

import { ProductGridSize } from './product_grid_size';
import { ProductGridItem } from './product_grid_item';
import { GridItemsSkeleton } from './skeletons/grid_item_skeleton';
import { ProductPaginationButtons } from './product_pagination_buttons';

type ProductGridProps = {
  searchParams: SearchParams;
};

export async function ProductGrid({ searchParams }: ProductGridProps) {
  const { grid } = extractSearchParams(searchParams);

  return (
    <section
      className={cn(
        'grid gap-8 grid-cols-2 grid-rows-[auto,1fr] lg:grid-cols-4 xl:col-[2] w-full xl:self-start',
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

      <Suspense fallback={<GridItemsSkeleton />}>
        <DisplayProductsGrid {...searchParams} />
      </Suspense>
    </section>
  );
}

async function DisplayProductsGrid(searchParams: SearchParams) {
  const products = await getProducts(searchParams);

  if (products.length == 0) {
    return (
      <div className='relative col-span-full flex flex-col items-center gap-8'>
        <p className='z-[1] text-xl sm:text-2xl lg:text-4xl text-center text-muted-foreground tracking-wider font-semibold'>
          No Products Found!
        </p>
        <Ban className='size-36 sm:size-52 lg:size-72 stroke-[1] text-input' />
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

export function getFilters(searchParams: SearchParams) {
  const { category, brand, min, max } = extractSearchParams(searchParams);

  let filter: { [k: string]: any } = category ? { category } : {};
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

const day = 60 * 60 * 24;

const getProducts = cache(
  async (searchParams: SearchParams) => {
    const { page, limit, sort } = extractSearchParams(searchParams);
    const filter = getFilters(searchParams);
    const limitPerPage = +limit <= 0 ? 8 : +limit;
    const start = (+page <= 0 ? 0 : +page - 1) * limitPerPage;

    type SortOptions = Record<Exclude<SortValue, ''>, Record<string, 'asc' | 'desc'>>;
    const sortOptions: Omit<SortOptions, 'reset'> = {
      popular: { rating: 'desc' },
      newest: { createdAt: 'desc' },
      'lowest-price': { price: 'asc' },
      'highest-price': { price: 'desc' },
    };

    const args: {
      where?: any;
      orderBy: Record<string, 'asc' | 'desc'>;
      take: number;
      skip: number;
    } = {
      orderBy: sort ? sortOptions[sort as keyof typeof sortOptions] : { brand: 'asc' },
      take: limitPerPage,
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

    const totalCount = await prisma.product.count({ where: filter });
    const totalPages = Math.ceil(totalCount / limitPerPage);
    // Redirect to first page if is products and page is out of bounds
    if (totalCount > 0 && (+page > totalPages || +page <= 0 || +limit <= 0)) {
      const newParams = new URLSearchParams({ ...searchParams, page: '1', limit: '8' });
      redirect(`/products/?${newParams.toString()}`);
    }

    return products;
  },
  ['/products', 'getProductsData'],
  { revalidate: day }
);
