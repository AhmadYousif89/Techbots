'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';
import { SortValue } from '@/app/products/_lib/types';
import { extractSearchParams } from '@/app/products/_lib/utils';

export function SortProducts() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState<SortValue>('');
  const sp = extractSearchParams(params.entries());

  const paramObj: Record<string, string> = {
    ...(sp.page && { page: sp.page }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
    ...(sp.grid && { grid: sp.grid }),
  };
  const handleSelectChange = (v: SortValue) => {
    if (v === 'reset') {
      setValue('');
      const newParams = new URLSearchParams(paramObj);
      router.push(`/products?${newParams.toString()}`);
      return;
    }
    setValue(v);
    paramObj['sort'] = v;
    const newParams = new URLSearchParams(paramObj);
    router.push(`/products?${newParams.toString()}`);
  };

  return (
    <Select
      name='sort'
      value={value ? value : sp.sort}
      onValueChange={handleSelectChange}>
      <SelectTrigger className='gap-1 text-xs font-medium px-1 pl-2 border-0 rounded hover:bg-muted hover:ring-1 hover:ring-input'>
        <SelectValue placeholder='Sort' defaultValue='Sort' />
      </SelectTrigger>
      <SelectContent className='justify-center'>
        <SelectItem className='p-2 text-xs' value='popular'>
          Most popular
        </SelectItem>
        <SelectItem className='p-2 text-xs' value='newest'>
          Newest
        </SelectItem>
        <SelectItem className='p-2 text-xs' value='lowest-price'>
          Lowest Price
        </SelectItem>
        <SelectItem className='p-2 text-xs' value='highest-price'>
          Highest Price
        </SelectItem>
        {sp.sort && (
          <SelectItem disabled={!sp.sort} className='p-2 text-xs' value='reset'>
            Reset
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
