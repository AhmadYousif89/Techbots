'use client';
import { ChevronLeft } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractSearchParams } from '../../_lib/utils';
import { useFilter } from '../../_lib/store';
import { capitalizeString } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FilterContentBrands({ data }: { data: Promise<string[]> }) {
  const brands = use(data);
  const router = useRouter();
  const params = useSearchParams();
  const [showMore, setShowMore] = useState(false);
  const { selectedBrands, setBrands, toggleBrands, clearSelectedBrands } = useFilter(
    s => s.brands
  );
  const { page, limit, category, brand, sort, min, max, grid } = extractSearchParams(
    params.entries()
  );

  useEffect(() => {
    if (brand) {
      console.log('brand: ', brand);
      setBrands(brand.split(','));
    }
  }, [brand, setBrands]);

  const newParams = new URLSearchParams({
    ...(page && { page }),
    ...(limit && { limit }),
    ...(limit && { limit }),
    ...(category && { cat: category }),
    ...(sort && { sort }),
    ...(min && { min }),
    ...(max && { max }),
    ...(grid && { grid }),
  });

  const url = () => `/products/?${newParams.toString()}`;

  const hasFilterBrand = selectedBrands.length > 0;
  const end = 30;
  const list = brands.length > end ? brands.slice(0, end) : brands;

  const onBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    toggleBrands([name]);
    const brands = [...selectedBrands];
    if (!brands.includes(name)) {
      brands.push(name);
      const newBrandQuery = brands.join(',');
      router.push(url() + (newBrandQuery ? `&brand=${newBrandQuery}` : ''));
    } else {
      const newBrandQuery = brands.filter(brand => brand !== name).join(',');
      router.push(url() + (newBrandQuery ? `&brand=${newBrandQuery}` : ''));
    }
  };

  return (
    <>
      <div className='flex items-center justify-between gap-4'>
        <h3 className='flex items-center gap-2 font-medium text-muted-foreground'>
          Brands
          {selectedBrands.length > 0 && (
            <small className='text-primary ring-1 ring-input shadow rounded-full aspect-square size-5 inline-grid place-content-center font-semibold'>
              {selectedBrands.length}
            </small>
          )}
        </h3>
        {hasFilterBrand && (
          <Button
            variant={'link'}
            onClick={() => {
              clearSelectedBrands();
              router.push(url());
            }}
            className='gap-1 text-xs py-0 h-auto font-medium text-muted-foreground hover:text-destructive'>
            <ChevronLeft className='size-3' /> Clear
          </Button>
        )}
      </div>
      <div className='pl-4 grid grid-cols-[repeat(auto-fit,minmax(120px,auto))] gap-2 space-y-1 xl:grid-cols-[minmax(120px,auto),auto] xl:gap-x-0'>
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
                onChange={onBrandChange}
              />
              <Label
                htmlFor={key}
                className='text-xs cursor-pointer hover:text-muted-foreground'>
                {brand.startsWith('Philips') ? 'Philips' : capitalizeString(brand, false)}
              </Label>
            </div>
          );
        })}
        {brands.length > end && (
          <Accordion type='single' collapsible className='col-span-full'>
            <AccordionItem value='cats-2' className='border-b-0'>
              <AccordionContent>
                <div className='grid grid-cols-[repeat(auto-fit,minmax(120px,auto))] gap-2 space-y-1 xl:grid-cols-[minmax(120px,auto),auto] xl:gap-x-0'>
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
                          onChange={onBrandChange}
                        />
                        <Label
                          htmlFor={key}
                          className='text-xs cursor-pointer hover:text-muted-foreground'>
                          {brand.startsWith('Philips')
                            ? 'Philips'
                            : capitalizeString(brand, false)}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
              <AccordionTrigger
                onClick={() => setShowMore(!showMore)}
                className='py-0 pt-4 text-xs underline-offset-4 gap-1 justify-center text-muted-foreground hover:text-primary/50'>
                {showMore ? 'Show Less' : 'Show More'}
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </>
  );
}
