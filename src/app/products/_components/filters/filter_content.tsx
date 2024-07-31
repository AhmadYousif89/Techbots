import { Suspense } from 'react';
import { extractSearchParams } from '../../_lib/utils';
import { getBrandList, getCategoryList } from '@/lib/products';

import { Separator } from '@/components/ui/separator';
import { SearchParams } from '@/app/products/_lib/types';
import { FilterContentPrice } from './filter_content_price';
import { FilterContentBrands } from './filter_content_brand';
import { FilterItemsSkeleton } from '../skeletons/filter_items_skeleton';

export async function FilterContent(searchParams: SearchParams) {
  const { category } = extractSearchParams(searchParams);
  // const categories = getCategoryList();
  const brands = getBrandList(category);

  return (
    <div className='grid gap-y-8 sm:grid-cols-[60%,40%] xl:grid-cols-1 xl:max-w-xs'>
      <section className='space-y-8'>
        <Suspense fallback={<FilterItemsSkeleton />}>
          <FilterContentBrands data={brands} />
        </Suspense>
        <Separator className='sm:hidden' />
      </section>

      <section className='sm:flex sm:flex-row-reverse sm:gap-8 xl:flex-col-reverse'>
        <FilterContentPrice />
        <Separator className='hidden sm:block sm:w-px sm:h-auto xl:w-full xl:h-px ' />
      </section>
    </div>
  );
}
