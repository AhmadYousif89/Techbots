import { Filter, Search } from 'lucide-react';
import { SearchParams } from '@/app/products/_lib/types';
import { extractSearchParams } from './_lib/utils';
import { getBrandList } from '@/lib/products';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { FilterContentBrands } from './_components/filters/filter_content_brand';
import { FilterContentPrice } from './_components/filters/filter_content_price';

type FilterProductsProps = {
  searchParams: SearchParams;
  open?: string;
};

export function FilterProducts({ searchParams, open }: FilterProductsProps) {
  const { category } = extractSearchParams(searchParams);
  const brands = getBrandList(category);

  return (
    <Accordion type='single' collapsible defaultValue={open} className='flex-grow'>
      <AccordionItem
        value='filter'
        className='data-[state="closed"]:border-b-0 xl:border-b-0'>
        <AccordionTrigger className='group [&>svg]:hidden flex-grow-0 py-6 pl-4 md:pl-10 xl:pl-4'>
          <div className='flex items-center text-xs gap-2 hover:border-transparent'>
            <Filter className='size-4 group-hover:fill-muted-foreground group-data-[state="open"]:fill-muted-foreground' />
            <span>Filters</span>
          </div>
        </AccordionTrigger>
        <Separator className='xl:hidden' />
        <AccordionContent className='p-6 xl:pr-0'>
          <div className='grid gap-y-8 sm:grid-cols-[60%,40%] xl:grid-cols-1 xl:max-w-xs'>
            <section className='space-y-8'>
              <FilterContentBrands data={brands} />
              <Separator className='sm:hidden' />
            </section>
            <section className='sm:flex sm:flex-row-reverse sm:gap-8 xl:flex-col-reverse'>
              <FilterContentPrice />
              <Separator className='hidden sm:block sm:w-px sm:h-auto xl:w-full xl:h-px ' />
            </section>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
