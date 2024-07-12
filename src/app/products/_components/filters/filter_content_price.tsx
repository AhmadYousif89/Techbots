'use client';

import { ChangeEventHandler, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { extractSearchParams } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFilterContentState } from '@/lib/store';

export function FilterContentPrice() {
  const router = useRouter();
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const { setIsOpen } = useFilterContentState();
  const data = useSearchParams();

  const { page, limit, category, sort, grid } = extractSearchParams(data.entries());
  const url = (min: string = '', max: string = '') =>
    `/products?page=${page}&limit=${limit}&category=${category}&sort=${sort}&grid=${grid}&min=${min}&max=${max}&cf=true`;

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = e => {
    setMin(e.target.value);
  };

  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = e => {
    setMax(e.target.value);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='font-medium text-muted-foreground'>Price</h3>
      <div className='grid grid-cols-2 gap-4'>
        <Input
          id='min'
          type='number'
          placeholder='Min'
          value={min}
          onChange={handleMinChange}
        />
        <Input
          id='max'
          type='number'
          placeholder='Max'
          value={max}
          onChange={handleMaxChange}
        />
      </div>
      <Button
        variant={'outline'}
        size={'sm'}
        className='w-fit text-xs font-semibold'
        onClick={() => {
          setIsOpen(false);
          router.push(url(min, max));
        }}>
        Apply
      </Button>
    </div>
  );
}
