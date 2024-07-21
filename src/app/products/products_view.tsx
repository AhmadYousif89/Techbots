import { SearchParams } from '@/app/products/_lib/types';
import { extractSearchParams } from './_lib/utils';
import { capitalizeString } from '@/lib/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { PaginationSummary } from './_components/pagination_summary';
import { ProductGrid } from '@/app/products/_components/product_grid';
import { FilterProducts } from './_components/filters/filter_products';
import { SearchProducts } from './_components/filters/search_products';
import { SortProducts } from './_components/filters/sort_products';

type ProductsViewProps = {
  searchParams: SearchParams;
};

export function ProductsView({ searchParams }: ProductsViewProps) {
  const { category } = extractSearchParams(searchParams);

  return (
    <>
      <div className='px-4 md:px-10 flex items-center justify-between h-14 bg-muted'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='text-xs'>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className='text-xs'>
              <BreadcrumbLink href='/products'>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            {category && !category.includes(',') && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className='text-xs text-muted-foreground font-semibold'>
                    {capitalizeString(category)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <PaginationSummary searchParams={searchParams} />
      </div>

      <Separator />

      <div className='relative xl:hidden'>
        <FilterProducts searchParams={searchParams} />
        <div className='absolute right-0 top-[14px] pr-2 md:pr-8 flex items-center gap-4'>
          <SearchProducts />
          <SortProducts />
        </div>
      </div>
      <div className='xl:grid xl:gap-4 xl:grid-cols-[minmax(20%,auto),1fr]'>
        <div className='relative hidden xl:flex self-start justify-between pt-6'>
          <FilterProducts searchParams={searchParams} open='filter' />
          <div className='absolute right-0 top-9 flex items-center gap-4'>
            <SearchProducts />
            <SortProducts />
          </div>
        </div>
        <ProductGrid searchParams={searchParams} />
      </div>
    </>
  );
}
