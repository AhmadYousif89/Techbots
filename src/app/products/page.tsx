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
    <main className='group min-h-screen max-view mx-auto bg-background'>
      <Suspense fallback={<ProductsViewSkeleton />}>
        <div className='px-4 md:px-10 flex items-center justify-between h-14 bg-muted'>
          <BreadcrumbSection category={category} />
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

        <div className='xl:grid xl:gap-4 xl:grid-cols-[minmax(20%,auto),1fr] pb-8'>
          {/* Filter Section On Desktop */}
          <div className='relative hidden xl:flex self-start justify-between pt-6'>
            <FilterProducts searchParams={searchParams} open='filter' />
            <div className='absolute right-0 top-9 flex items-center gap-4'>
              <SortProducts searchParams={searchParams} />
            </div>
          </div>
          {/* End Filter */}
          <ProductGrid searchParams={searchParams} />
        </div>
      </Suspense>
    </main>
  );
}
