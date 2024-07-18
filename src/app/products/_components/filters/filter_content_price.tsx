'use client';

import { ChangeEventHandler, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractSearchParams } from '../../_lib/utils';
import { useFilter } from '../../_lib/store';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export function FilterContentPrice() {
  const router = useRouter();
  const params = useSearchParams();
  const { min, max, setMax, setMin, clearPrice } = useFilter(s => s.price);

  const { page, limit, category, sort, grid } = extractSearchParams(params.entries());
  const url = (min: string = '', max: string = '') =>
    `/products?page=${page}&limit=${limit}&cat=${category}&sort=${sort}&grid=${grid}&min=${min}&max=${max}&cf=true`;

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = e => {
    setMin(e.target.value);
  };

  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = e => {
    setMax(e.target.value);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-4'>
        <h3 className='font-medium text-muted-foreground'>Price</h3>
        {(min || max) && (
          <Button
            variant={'link'}
            onClick={() => {
              clearPrice();
              router.push(url());
            }}
            className='gap-1 text-xs py-0 h-auto font-medium text-muted-foreground hover:text-destructive'>
            <ChevronLeft className='size-3' /> Clear
          </Button>
        )}
      </div>
      <div className='flex items-center gap-4'>
        <Input
          id='min'
          type='number'
          placeholder='Min'
          className='xl:w-28'
          value={min}
          onChange={handleMinChange}
        />
        <Input
          id='max'
          type='number'
          placeholder='Max'
          className='xl:w-28'
          value={max}
          onChange={handleMaxChange}
        />
      </div>
      <Button
        size={'sm'}
        disabled={!min && !max}
        onClick={() => router.push(url(min, max))}
        className='text-xs self-start'>
        Apply
      </Button>
    </div>
  );
}
