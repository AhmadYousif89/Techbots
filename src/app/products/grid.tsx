import prisma from '@/lib/db';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { Ban } from 'lucide-react';
import { cache } from '@/lib/cache';
import { redirect } from 'next/navigation';
import { extractSearchParams } from './_lib/utils';
import { Category, SearchParams, SortValue, TProduct } from './_lib/types';

import { ProductGridSize } from './_components/product_grid_size';
import { ProductGridItem } from './_components/product_grid_item';
import { PaginationButtons } from './_components/pagination_button';
import { GridItemsSkeleton } from './_components/skeletons/grid_item';

type ProductGridProps = {
  searchParams: SearchParams;
};

export async function ProductGrid({ searchParams }: ProductGridProps) {
  const filters = getFilters(searchParams);
  const sp = extractSearchParams(searchParams);
  const totalCount = await prisma.product.count({ where: filters });

  const { page } = sp;
  const limitPerPage = 8;
  const totalPages = Math.ceil(totalCount / limitPerPage);
  const start = (+page <= 0 || +page > totalPages ? 0 : +page - 1) * limitPerPage;
  const end = start + limitPerPage;

  const hasNextPage = end < totalCount;
  const hasPrevPage = start > 0;

  const params = {
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
    ...(sp.grid && { grid: sp.grid }),
  };
  const newParams = new URLSearchParams(params);

  const ps = newParams.toString() ? `&${newParams.toString()}` : '';

  const firstPageUrl = `/products/?page=1${ps}`;
  const nextPageUrl = `/products/?page=${+page == 0 ? 2 : +page + 1}${ps}`;
  const prevPageUrl = `/products/?page=${+page - 1}${ps}`;
  const lastPageUrl = `/products/?page=${totalPages}${ps}`;

  return (
    <div>
      <div className='flex items-center h-16 px-8'>
        {totalCount > 0 && <ProductGridSize />}
        {totalPages > 0 && (
          <PaginationButtons
            className='flex items-center justify-center gap-2 ml-auto'
            page={page}
            baseUrl={'/products/'}
            params={ps}
            totalCount={totalCount}
            totalPages={totalPages}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            firstPageUrl={firstPageUrl}
            prevPageUrl={prevPageUrl}
            nextPageUrl={nextPageUrl}
            lastPageUrl={lastPageUrl}
          />
        )}
      </div>
      <section
        className={cn(
          'grid gap-y-16 gap-x-8 grid-cols-2 grid-rows-[auto,1fr] lg:grid-cols-4 xl:col-[2] w-full xl:self-start',
          'py-8 px-4 xl:pr-8 xl:pl-0 max-w-screen-lg mx-auto xl:ml-auto',
          'sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]',
          sp.grid === '2' && 'lg:grid-cols-2',
          sp.grid === '3' && 'lg:grid-cols-3',
          sp.grid === '4' && 'lg:grid-cols-4'
        )}>
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<GridItemsSkeleton grid={sp.grid} />}>
          <DisplayProductsGrid {...searchParams} />
        </Suspense>
      </section>
    </div>
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
      {products.map(product => (
        <ProductGridItem key={product.id} searchParams={searchParams} product={product} />
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
        ...(min && !isNaN(+min) ? [{ price: { gte: +min } }] : []),
        ...(max && !isNaN(+max) ? [{ price: { lte: +max } }] : []),
      ],
    };
  }

  return filter;
}

const getProducts = cache(
  async (searchParams: SearchParams) => {
    const limit = 8;
    const filter = getFilters(searchParams);
    const { page, sort } = extractSearchParams(searchParams);
    const totalCount = await prisma.product.count({ where: filter });
    const totalPages = Math.ceil(totalCount / limit);
    const start = (+page <= 0 || +page > totalPages ? 0 : +page - 1) * limit;

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
      orderBy: sort
        ? sortOptions[sort as keyof typeof sortOptions]
        : { createdAt: 'asc' },
      take: limit,
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

    // Redirect to first page if is products and page is out of bounds
    if (totalCount > 0 && (+page > totalPages || +page < 0)) {
      console.log('Redirecting to first page');
      const newParams = new URLSearchParams({ ...searchParams, page: '1' });
      redirect(`/products/?${newParams.toString()}`);
    }

    return products;
  },
  ['/products', 'getProducts']
);
