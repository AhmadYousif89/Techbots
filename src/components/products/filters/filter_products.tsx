import { Filter, Search } from 'lucide-react';
import { Category } from '@/lib/store';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../ui/accordion';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { FilterContent } from './filter_content';
import { SearchProducts } from './search_products';

type FilterProductsProps = {
  searchParams: { [key: string]: string | Category | undefined };
};

export function FilterProducts({ searchParams }: FilterProductsProps) {
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
          <Button size={'sm'} variant={'link'} disabled className='relative text-xs'>
            Reset
          </Button>
        </div>

        <div className='absolute right-0 md:right-2 top-[14px]'>
          <div className='flex items-center gap-4'>
            <SearchProducts />

            <Select>
              <SelectTrigger className='gap-2 text-xs font-medium border-0 rounded-none py-0'>
                <SelectValue placeholder='Sort' />
              </SelectTrigger>
              <SelectContent className='justify-center'>
                <SelectItem className='p-2 text-xs' value='popular'>
                  Most popular
                </SelectItem>
                <SelectItem className='p-2 text-xs' value='newest'>
                  Newest
                </SelectItem>
                <SelectItem className='p-2 text-xs' value='price'>
                  Price
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
