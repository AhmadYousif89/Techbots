'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { SortValue } from '@/app/products/_lib/types';
import { extractSearchParams } from '@/app/products/_lib/utils';

export function SortProducts() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState<SortValue | ''>('');
  const { page, limit, category, grid, sort, min, max } = extractSearchParams(
    params.entries()
  );

  const handleSelectChange = (value: SortValue) => {
    setValue(value);
    const newQueryParams = new URLSearchParams({
      page,
      limit,
      category,
      sort: value,
      min,
      max,
      grid
    });
    router.push(`/products?${newQueryParams.toString()}`);
  };

  return (
    <Select value={value ? value : sort} onValueChange={handleSelectChange}>
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
        <SelectItem className='p-2 text-xs' value='lowest-price'>
          Lowest Price
        </SelectItem>
        <SelectItem className='p-2 text-xs' value='highest-price'>
          Highest Price
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
