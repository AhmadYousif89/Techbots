import { filterAndPaginateProducts } from '@/lib/actions';
import type { Category } from '@/lib/store';
import { capitalizeString } from '@/lib/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductGrid } from '@/components/products/product_grid';
import { FilterProducts } from '@/components/products/filters/filter_products';

type PageProps = {
  searchParams: { [key: string]: string | Category | undefined };
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const {
    category,
    start,
    end,
    totalProducts,
    paginatedProducts,
    totalPages,
    hasNextPage,
    hasPrevPage
  } = await filterAndPaginateProducts(searchParams);

  return (
    <main className='min-h-screen max-w-screen-xl mx-auto bg-background'>
      <Card className='py-8 rounded-none border-0 shadow-none'>
        <div className='px-2 md:px-4 mb-4 flex items-center justify-between'>
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

          <div className='text-xs font-medium text-muted-foreground'>
            <p>
              Showing {start + 1} - {end} of {totalProducts} results
            </p>
          </div>
        </div>
        <Separator />
        <FilterProducts searchParams={searchParams} />
        <ProductGrid
          searchParams={searchParams}
          products={paginatedProducts}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </Card>
    </main>
  );
}
