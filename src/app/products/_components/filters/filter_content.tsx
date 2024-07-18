import { Suspense } from 'react';
import prisma from '@/lib/db';
import { cache } from '@/lib/cache';
import { Separator } from '@/components/ui/separator';
import { SearchParams } from '@/app/products/_lib/types';
import { ApplyFiltersButton } from './apply_filters_button';
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

export const getBrandList = cache(
  async () => {
    const brands = await prisma.product.findMany({
      select: { brand: true },
      orderBy: { brand: 'asc' }
    });
    const list: string[] = [];
    for (const item of brands) {
      if (!list.includes(item.brand.toLowerCase())) {
        if (item.brand.startsWith('Philips')) {
          list.push('philips');
          continue;
        }
        list.push(item.brand.toLowerCase());
      }
    }

    return list;
  },
  ['/products', 'getBrandList'],
  { revalidate: day }
);

type FilterContentProps = {
  searchParams: SearchParams;
};

export async function FilterContent({ searchParams }: FilterContentProps) {
  const categories = getCategoryList();
  const brands = getBrandList();

  return (
    <div className='grid gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1fr_1.5fr_1fr]'>
      <section className='space-y-8'>
        <Suspense fallback={<FilterItemsSkeleton />}>
          <FilterContentCategory data={categories} />
        </Suspense>
        <Separator className='sm:w-px sm:h-auto' />
      </section>

      <section className='sm:flex flex-row-reverse gap-8 space-y-8'>
        <Suspense fallback={<FilterItemsSkeleton />}>
          <div className='flex-1 flex flex-col gap-4'>
            <FilterContentBrands data={brands} />
          </div>
        </Suspense>
        <Separator className='sm:w-px sm:h-auto' />
      </section>

      <Separator className='hidden sm:block col-span-full' />
      <section className='space-y-8 sm:col-span-full lg:flex lg:flex-row-reverse lg:gap-x-8 lg:col-[3] lg:row-[1]'>
        <div className='max-w-xl'>
          <FilterContentPrice />
        </div>
        <Separator className='lg:w-px lg:h-auto' />
      </section>

      <ApplyFiltersButton />
    </div>
  );
}
