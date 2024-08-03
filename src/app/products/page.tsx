import { Metadata } from 'next';
import { Suspense } from 'react';
import { capitalizeString } from '@/lib/utils';
import { extractSearchParams } from './_lib/utils';
import { Separator } from '@/components/ui/separator';
import { SearchParams } from '@/app/products/_lib/types';
import { PaginationSummary } from './_components/pagination_summary';
import { BreadcrumbSection } from './_components/product_breadcrumb';
import { ProductsViewSkeleton } from './_components/skeletons/products_view';

import { ProductGrid } from './grid';
import { SortProducts } from './sort';
import { FilterProducts } from './filter';
import { SearchProducts } from './search';

export const generateMetadata = ({ searchParams }: PageProps): Metadata => {
  const category = capitalizeString(searchParams['cat'] ?? '', false);
  let brand = searchParams['brand'] ?? '';
  brand = brand.includes(',')
    ? brand
        .split(',')
        .map(b => capitalizeString(b))
        .join(', ')
    : brand;
  const title = `Shop ${category ? '| ' + category : ''}`;
  const description = `Find the best products online${
    category ? ` for ${category}${brand ? ` from ${brand}.` : '.'}` : '.'
  }`;

  return { title, description };
};

type PageProps = {
  params: Record<string, string>;
  searchParams: SearchParams;
};

export default function ProductsPage({ searchParams }: PageProps) {
  const { category } = extractSearchParams(searchParams);

  return (
    <Suspense fallback={<ProductsViewSkeleton />}>
      <main className='group min-h-screen max-view mx-auto bg-background'>
        <div className='px-4 md:px-10 flex items-center justify-between h-14 bg-muted'>
          <BreadcrumbSection category={category} />
          <div className='hidden relative hover:bg-input rounded-full overflow-hidden xl:flex items-center min-w-80 h-8 ring-2 ring-input *:w-full *:h-full *:justify-end *:pr-2'>
            <p className='absolute z-0 top-0 left-0 pl-4 pointer-events-none text-xs text-muted-foreground font-semibold flex items-center'>
              <span className='w-full'>Search...</span>
            </p>
            <SearchProducts />
          </div>
          <PaginationSummary searchParams={searchParams} />
        </div>

        <Separator />
        {/* Filter Section On Small Screens */}
        <div className='relative xl:hidden'>
          <FilterProducts searchParams={searchParams} />
          <div className='absolute right-0 top-[14px] pr-2 md:pr-8 flex items-center gap-4'>
            <SearchProducts />
            <SortProducts searchParams={searchParams} />
          </div>
        </div>
        {/* End Filter */}

        <div className='xl:grid xl:gap-8 xl:grid-cols-[minmax(20%,auto),1fr] py-8'>
          {/* Filter Section On Desktop */}
          <div className='relative hidden xl:flex self-start justify-between'>
            <FilterProducts searchParams={searchParams} open='filter' />
            <div className='absolute right-0 top-3 flex items-center gap-4'>
              <SortProducts searchParams={searchParams} />
            </div>
          </div>
          {/* End Filter */}
          <ProductGrid searchParams={searchParams} />
        </div>
      </main>
    </Suspense>
  );
}
