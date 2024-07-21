'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent
} from '@/components/ui/select';
import { SortValue } from '@/app/products/_lib/types';
import { extractSearchParams } from '@/app/products/_lib/utils';

export function SortProducts() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState<SortValue>('');
  const { page, limit, category, brand, grid, sort, min, max } = extractSearchParams(
    params.entries()
  );

  const handleSelectChange = (value: SortValue) => {
    setValue(value);
    const newParams = new URLSearchParams({
      ...(page && { page }),
      ...(limit && { limit }),
      ...(category && { category }),
      ...(brand && { brand }),
      sort: value,
      ...(min && { min }),
      ...(max && { max }),
      ...(grid && { grid })
    });
    router.push(`/products?${newParams.toString()}`);
  };

  return (
    <Select value={value ? value : sort} onValueChange={handleSelectChange}>
      <SelectTrigger className='gap-1 text-xs font-medium px-1 pl-2 border-0 rounded hover:bg-muted hover:ring-1 hover:ring-input'>
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
