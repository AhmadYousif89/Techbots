import { Filter, Search } from 'lucide-react';
import { SearchParams } from '@/app/products/_lib/types';
import { FilterContent } from './filter_content';

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

export function FilterProducts({ searchParams }: FilterProductsProps) {
  return (
    <Accordion type='single' collapsible className='flex-grow'>
      <AccordionItem value='filter' className='data-[state="closed"]:border-b-0'>
        <AccordionTrigger className='group [&>svg]:hidden flex-grow-0 py-6 pl-4 md:pl-10'>
          <div className='flex items-center text-xs gap-2 hover:border-transparent'>
            <Filter className='size-4 group-hover:fill-muted-foreground group-data-[state="open"]:fill-muted-foreground' />
            <span>Filters</span>
          </div>
        </AccordionTrigger>
        <Separator />
        <AccordionContent className='p-6'>
          {/* Filter Content */}
          <FilterContent searchParams={searchParams} />
          {/* Filter Content */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
