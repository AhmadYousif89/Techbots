import { Suspense } from 'react';
import prisma from '@/lib/db';
import { cache } from '@/lib/cache';
import { Separator } from '@/components/ui/separator';
import { SearchParams } from '@/app/products/_lib/types';
import { FilterContentPrice } from './filter_content_price';
import { FilterContentBrands } from './filter_content_brand';
import { FilterContentCategory } from './filter_content_category';
import { FilterItemsSkeleton } from '../skeletons/filter_items_skeleton';

const day = 60 * 60 * 24;

export const getCategoryList = cache(
  async () => {
    const categories = await prisma.product.findMany({
      select: { category: true, brand: true },
      orderBy: { category: 'asc' }
    });
    const list: string[] = [];
    for (const item of categories) {
      if (!list.includes(item.category.toLowerCase())) {
        list.push(item.category.toLowerCase());
      }
    }

    return list;
  },
  ['/products', 'getCategoryList'],
  { revalidate: day }
);

export const getBrandList = async () => {
  const brands = await prisma.product.findMany({
    select: { brand: true },
    orderBy: { brand: 'asc' }
  });

  const list: string[] = [];
  for (const item of brands) {
    if (!list.includes(item.brand)) {
      if (item.brand.startsWith('Philips')) {
        list.push('philips');
        continue;
      }
      list.push(item.brand);
    }
  }

  return list;
};

type FilterContentProps = {
  searchParams: SearchParams;
};

export async function FilterContent({ searchParams }: FilterContentProps) {
  const categories = getCategoryList();
  const brands = getBrandList();

  return (
    <div className='grid gap-y-8 sm:grid-cols-2 xl:grid-cols-1 xl:max-w-xs'>
      {/* <section className='space-y-8'>
        <Suspense fallback={<FilterItemsSkeleton />}>
          <FilterContentCategory data={categories} />
        </Suspense>
        <Separator className='sm:w-px sm:h-auto' />
      </section> */}

      <section className='space-y-8'>
        <Suspense fallback={<FilterItemsSkeleton />}>
          <div className='flex flex-col gap-4'>
            <FilterContentBrands data={brands} />
          </div>
        </Suspense>
        <Separator className='sm:hidden' />
      </section>

      <section className='sm:flex sm:flex-row-reverse sm:gap-8 xl:flex-col-reverse'>
        <div>
          <FilterContentPrice />
          {/* <ApplyFiltersButton /> */}
        </div>
        <Separator className='hidden sm:block sm:w-px sm:h-auto xl:w-full xl:h-px ' />
      </section>
    </div>
  );
}
