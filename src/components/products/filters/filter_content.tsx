import { filterAndPaginateProducts, getColorList } from '@/lib/actions';
import { FilterContentCategory } from './filter_content_category';
import { FilterContentColors } from './filter_content_color';
import { FilterContentPrice } from './filter_content_price';
import { Separator } from '../../ui/separator';
import { Category } from '@/lib/store';
import { Product } from '@/lib/types';

type FilterContentProps = {
  searchParams: { [key: string]: string | Category | undefined };
};

export async function FilterContent({ searchParams }: FilterContentProps) {
  const { paginatedProducts: products } = await filterAndPaginateProducts(searchParams);
  const colors = await getColorList();

  const filterByPrice = (p: Product[]) => {};

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
          <FilterContentPrice
            products={products}
            // onFilter={filterByPrice}
          />
        </section>
      </div>
    </div>
  );
}
