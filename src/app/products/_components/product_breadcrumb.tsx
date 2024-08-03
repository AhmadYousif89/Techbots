import Link from 'next/link';
import { capitalizeString } from '@/lib/utils';
import { getProductCategory } from '../[asin]/page';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type BreadcrumbSectionProps = {
  asin?: string;
  type?: 'single' | '';
  category?: string;
};

export async function BreadcrumbSection({
  asin,
  type = '',
  category = '',
}: BreadcrumbSectionProps) {
  if (type === 'single') {
    const category = asin ? await getProductCategory(asin) : '';

    return (
      <Breadcrumb className='flex items-center col-span-full px-4 lg:px-10 bg-muted h-14'>
        <BreadcrumbList>
          <BreadcrumbItem className='text-xs text-muted-foreground hover:underline underline-offset-4'>
            <BreadcrumbLink asChild>
              <Link href='/'>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className='text-xs text-muted-foreground hover:underline underline-offset-4'>
            <BreadcrumbLink asChild>
              <Link href='/products'>Shop</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem className='text-xs text-muted-foreground hover:underline underline-offset-4'>
                <BreadcrumbLink asChild>
                  <Link href={`/products?cat=${category}`}>
                    {capitalizeString(category)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem className='text-xs'>
            <BreadcrumbPage>{asin}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='text-xs hover:underline underline-offset-4'>
          <BreadcrumbLink asChild>
            <Link href='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className='text-xs hover:underline underline-offset-4'>
          <BreadcrumbLink asChild>
            <Link href='/products'>Shop</Link>
          </BreadcrumbLink>
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
  );
}
