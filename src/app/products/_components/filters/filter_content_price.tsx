'use client';

import { ChangeEventHandler, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractSearchParams } from '../../_lib/utils';
import { useFilter } from '../../_lib/store';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function FilterContentPrice() {
  const router = useRouter();
  const params = useSearchParams();
  const { min, max, setMax, setMin, clearPrice } = useFilter(s => s.price);

  const sp = extractSearchParams(params.entries());
  const newParams = new URLSearchParams({
    ...(sp.page && { page: sp.page }),
    ...(sp.limit && { limit: sp.limit }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.grid && { grid: sp.grid }),
  });
  const url = () => `/products?${newParams.toString()}`;
  const { min: paramMin, max: paramMax } = sp;

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = e => {
    setMin(parseInt(e.target.value) + '');
  };

  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = e => {
    setMax(parseInt(e.target.value) + '');
  };

  return (
    <form
      className='grid gap-4 self-start'
      onSubmit={e => {
        e.preventDefault();
        router.push(
          url() + `&min=${min ? min : paramMin}` + `&max=${max ? max : paramMax}`
        );
      }}>
      <div className='flex items-center justify-between gap-4'>
        <h3 className='font-medium text-muted-foreground'>Price</h3>
        {(paramMin || paramMax) && (
          <Button
            type='button'
            variant={'link'}
            onClick={() => {
              clearPrice();
              router.push(url());
            }}
            className='gap-1 text-xs py-0 h-auto font-medium text-muted-foreground hover:text-destructive'>
            <ChevronLeft className='size-3' /> Reset
          </Button>
        )}
      </div>
      <div className='flex items-center gap-4'>
        <Input
          id='min'
          min={1}
          max={5000}
          type='number'
          placeholder='Min'
          className='xl:w-28'
          value={min ? min : paramMin}
          onChange={handleMinChange}
        />
        <Input
          id='max'
          min={1}
          max={5000}
          type='number'
          placeholder='Max'
          className='xl:w-28'
          value={max ? max : paramMax}
          onChange={handleMaxChange}
        />
      </div>
      <small className='text-muted-foreground font-medium'>
        {paramMin && paramMax ? (
          <>
            Showing prices between{' '}
            <strong>
              {paramMin} & {paramMax}
            </strong>
          </>
        ) : paramMin ? (
          <>
            Showing prices with minimum value of <strong>{paramMin}</strong>
          </>
        ) : paramMax ? (
          <>
            Showing prices with maximum value of <strong>{paramMax}</strong>
          </>
        ) : null}
      </small>
      <Button
        size={'sm'}
        disabled={+min < 1 && +max < 1}
        className='text-xs justify-self-start min-w-20 active:translate-y-1 duration-200 transition-transform'>
        Apply
      </Button>
    </form>
  );
}
