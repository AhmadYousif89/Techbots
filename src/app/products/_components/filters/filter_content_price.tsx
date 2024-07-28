'use client';

import { ChangeEventHandler, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractSearchParams } from '../../_lib/utils';
import { useFilter } from '../../_store/filters';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export function FilterContentPrice() {
  const router = useRouter();
  const params = useSearchParams();
  const { min, max, setMax, setMin, clearPrice } = useFilter(s => s.price);

  const sp = extractSearchParams(params.entries());
  const newParams = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (key === 'min' || key === 'max') continue;
    if (value) newParams.append(key, value);
  }

  const { min: paramMin, max: paramMax } = sp;
  const ps = newParams.toString();
  const minParam = min && `min=${min ? min : paramMin}`;
  const maxParam = max && `max=${max ? max : paramMax}`;
  const url = () => {
    const params = [ps, minParam, maxParam].filter(Boolean).join('&');
    return `/products${params ? `?${params}` : ''}`;
  };

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = e => {
    const val = parseFloat(e.target.value);
    setMin(isNaN(val) ? '' : val.toString());
  };

  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = e => {
    const val = parseFloat(e.target.value);
    setMax(isNaN(val) ? '' : val.toString());
  };

  return (
    <form
      className='grid gap-4 self-start w-full max-w-sm'
      onSubmit={e => {
        e.preventDefault();
        router.push(url());
      }}>
      <div className='flex items-center justify-between gap-4'>
        <h3 className='font-medium text-muted-foreground'>Price</h3>
        {(paramMin.trim() || paramMax.trim()) && (
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
        <Label htmlFor='min' className='relative flex-1 min-w-28'>
          <Input
            id='min'
            min={1}
            max={5000}
            type='number'
            placeholder='Min'
            className='placeholder:text-muted-foreground'
            onChange={handleMinChange}
            value={min}
          />
          {paramMin.trim() && (
            <Badge
              variant={'secondary'}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground'>
              {paramMin}
            </Badge>
          )}
        </Label>
        <Label htmlFor='max' className='relative flex-1 min-w-28'>
          <Input
            id='max'
            min={1}
            max={5000}
            type='number'
            placeholder='Max'
            className='placeholder:text-muted-foreground'
            onChange={handleMaxChange}
            value={max}
          />
          {paramMax.trim() && (
            <Badge
              variant={'secondary'}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground'>
              {paramMax}
            </Badge>
          )}
        </Label>
      </div>
      <small className='text-muted-foreground font-medium'>
        {/* trim is necessary for when manually changing the url values */}
        {paramMin.trim() && paramMax.trim() ? (
          <>
            Showing items between{' '}
            <span className='font-semibold'>
              ${Number(paramMin).toFixed(2)} and ${Number(paramMax).toFixed(2)}
            </span>
          </>
        ) : paramMin.trim() ? (
          <>
            Showing items with minimum value of{' '}
            <span className='font-semibold'>${Number(paramMin).toFixed(2)}</span>
          </>
        ) : paramMax.trim() ? (
          <>
            Showing items with maximum value of{' '}
            <span className='font-semibold'>${Number(paramMax).toFixed(2)}</span>
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
