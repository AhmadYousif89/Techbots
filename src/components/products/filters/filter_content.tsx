import { categories } from '@/lib/store';
import { capitalizeString } from '@/lib/utils';
import { getColorList, getLocalProducts } from '@/lib/actions';

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Separator } from '../../ui/separator';
import { FilterContentCategory } from './filter_content_category';
import { FilterContentColors } from './filter_content_color';
import { FilterContentPrice } from './filter_content_price';

export async function FilterContent() {
  const products = await getLocalProducts();
  const colors = getColorList(products);

  return (
    <div className='p-4'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1fr_1.5fr_1fr]'>
        {/* Categories */}
        <section className='mb-8'>
          <FilterContentCategory />
        </section>

        <Separator className='sm:w-px sm:h-auto sm:col-[2] sm:row-[1]' />

        {/* Colors */}
        <section className='mb-8 mt-4 sm:mt-0 sm:ml-[10%] sm:col-[2] sm:row-[1]'>
          <FilterContentColors colors={colors} />
        </section>

        <Separator className='col-span-full lg:w-px lg:h-auto lg:col-[3] lg:row-[1]' />

        {/* Price */}
        <section className='mb-8 mt-4 lg:mt-0 lg:ml-[10%] col-[1] lg:col-[3] lg:row-[1]'>
          <FilterContentPrice />
        </section>
      </div>
    </div>
  );
}
