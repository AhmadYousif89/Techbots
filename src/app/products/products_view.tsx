import prisma from '@/lib/db';
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
import { ProductGrid } from '@/app/products/_components/product_grid';
import { FilterProducts } from './_components/filters/filter_products';

type ProductsViewProps = {
  searchParams: SearchParams;
};

export async function ProductsView({ searchParams }: ProductsViewProps) {
  const { page, limit, category } = extractSearchParams(searchParams);
  const totalCount = await prisma.product.count();
  const start = (+page - 1) * +limit;
  const end = start + +limit;

  return (
    <>
      <div className='px-2 md:px-4 flex items-center justify-between h-14 bg-muted'>
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

        <p className='text-xs font-medium text-muted-foreground'>
          Showing {start + 1} - {end} of {totalCount} results
        </p>
      </div>

      <Separator />

      <FilterProducts searchParams={searchParams} />

      <ProductGrid searchParams={searchParams} />
    </>
  );
}
