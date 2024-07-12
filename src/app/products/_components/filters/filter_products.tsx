import { SearchParams } from '@/lib/types';
import { Filter, Search } from 'lucide-react';
import { SortProducts } from './sort_products';
import { FilterContent } from './filter_content';
import { SearchProducts } from './search_products';
import { ApplyFiltersButton } from './apply_filters_button';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

type FilterProductsProps = {
  searchParams: SearchParams;
};

export async function FilterProducts({ searchParams }: FilterProductsProps) {
  // const cf = searchParams['cf'];

  return (
    <section aria-label='filters' className='flex items-center justify-between'>
      <div className='relative flex items-center gap-4 w-full'>
        <Accordion type='single' collapsible className='flex-grow'>
          <AccordionItem value='filter' className='data-[state="closed"]:border-b-0'>
            <AccordionTrigger className='group [&>svg]:hidden flex-grow-0 py-6 pl-2 md:pl-4'>
              <div className='flex items-center text-xs gap-2 hover:border-transparent'>
                <Filter className='size-4 group-hover:fill-muted-foreground group-data-[state="open"]:fill-muted-foreground' />
                <span>Filters</span>
              </div>
            </AccordionTrigger>
            <Separator />
            <AccordionContent className='p-0'>
              {/* Filter Content */}
              <FilterContent searchParams={searchParams} />
              {/* Filter Content */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className='absolute left-20 md:left-24 top-[14px] flex items-center'>
          <Separator orientation='vertical' className='h-6 mr-2' />
          <ApplyFiltersButton />
        </div>

        <div className='absolute right-0 md:right-2 top-[14px]'>
          <div className='flex items-center gap-4'>
            <SearchProducts />
            <SortProducts />
          </div>
        </div>
      </div>
    </section>
  );
}
