'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SortValue } from '../../_actions/actions';
import { extractSearchParams } from '@/lib/utils';

type SortProductsProps = {};

export function SortProducts({}: SortProductsProps) {
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
