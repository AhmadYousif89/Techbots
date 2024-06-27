import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../ui/breadcrumb';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { FilterProducts } from './filter_products';

export function ProductsLayout() {
  return (
    <Card className='py-8 rounded-none'>
      <div className='px-2 flex items-center justify-between'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='text-xs'>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className='text-xs'>
              <BreadcrumbLink href='/products'>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='text-xs'>Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='text-[12px] font-medium text-muted-foreground'>
          <p>
            Showing 1-9 of <span className='text-sm'>20</span> results
          </p>
        </div>
      </div>

      <Separator className='my-4' />

      <FilterProducts />

      <Separator className='my-4' />
      <h1>Products</h1>
    </Card>
  );
}
