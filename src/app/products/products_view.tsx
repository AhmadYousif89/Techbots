import { SearchParams } from '@/lib/types';
import { capitalizeString, extractSearchParams } from '@/lib/utils';

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

type ProductsViewProps = {
  searchParams: SearchParams;
};

export function ProductsView({ searchParams }: ProductsViewProps) {
  const { category } = extractSearchParams(searchParams);

  return (
    <>
      <div className='px-2 md:px-4 lg:px-10 flex items-center justify-between h-14 bg-muted'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='text-xs'>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className='text-xs'>
              <BreadcrumbLink href='/products'>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
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

        <PaginationSummary className='hidden sm:block' searchParams={searchParams} />
      </div>

      <Separator />

      <FilterProducts searchParams={searchParams} />

      <ProductGrid searchParams={searchParams} />
    </>
  );
}
