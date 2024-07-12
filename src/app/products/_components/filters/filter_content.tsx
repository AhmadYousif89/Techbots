import { Product, Category, getColorList } from '@/app/products/_actions/actions';
import { FilterContentCategory } from './filter_content_category';
import { FilterContentColors } from './filter_content_color';
import { FilterContentPrice } from './filter_content_price';
import { Separator } from '@/components/ui/separator';
import { SearchParams } from '@/lib/types';

type FilterContentProps = {
  searchParams: SearchParams;
};

export async function FilterContent({ searchParams }: FilterContentProps) {
  // const colors = await getColorList();

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
          {/* <FilterContentColors colors={colors} /> */}
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
