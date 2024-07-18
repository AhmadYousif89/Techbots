'use client';
import { use, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { capitalizeString } from '@/lib/utils';
import { useFilter } from '../../_lib/store';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export function FilterContentBrands({ data }: { data: Promise<string[]> }) {
  const brands = use(data);
  const [showMore, setShowMore] = useState(false);
  const { selectedBrands, setBrands, clearSelectedBrands } = useFilter(s => s.brands);

  const hasFilterBrand = selectedBrands.length > 0;
  const end = 20;
  const list = brands.length > end ? brands.slice(0, end) : brands;

  return (
    <>
      <div className='flex items-center justify-between'>
        <h3 className='font-medium text-muted-foreground'>Brands</h3>
        {hasFilterBrand && (
          <Button
            variant={'link'}
            onClick={() => clearSelectedBrands()}
            className='gap-1 text-xs py-0 h-auto font-medium text-muted-foreground hover:text-destructive'>
            <ChevronLeft className='size-3' /> Clear
          </Button>
        )}{' '}
      </div>
      <div className='px-2 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 space-y-1'>
        {list.map((brand, i) => {
          const key = brand + '-' + i;
          return (
            <div key={key} className='flex items-center gap-2'>
              <Input
                id={key}
                name={brand}
                type='checkbox'
                className='w-4 h-4 cursor-pointer'
                checked={selectedBrands.includes(brand)}
                onChange={e => setBrands(e.target.name)}
              />
              <Label
                htmlFor={key}
                className='text-xs cursor-pointer hover:text-muted-foreground'>
                {capitalizeString(brand)}
              </Label>
            </div>
          );
        })}
        {brands.length > end && (
          <Accordion type='single' collapsible className='col-span-full'>
            <AccordionItem value='cats-2' className='border-b-0'>
              <AccordionContent>
                <div className='grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 space-y-1'>
                  {brands.slice(end).map((brand, i) => {
                    const key = brand + '-' + i;
                    return (
                      <div key={key} className='flex items-center gap-2'>
                        <Input
                          id={key}
                          name={brand}
                          type='checkbox'
                          className='w-4 h-4 cursor-pointer'
                          checked={selectedBrands.includes(brand)}
                          onChange={e => setBrands(e.target.name)}
                        />
                        <Label
                          htmlFor={key}
                          className='text-xs cursor-pointer hover:text-muted-foreground'>
                          {capitalizeString(brand)}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
              <AccordionTrigger
                onClick={() => setShowMore(!showMore)}
                className='py-0 pt-4 text-[10px] underline-offset-4 gap-1 justify-center text-muted-foreground hover:text-primary/50'>
                {showMore ? 'Show Less' : 'Show More'}
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </>
  );
}
