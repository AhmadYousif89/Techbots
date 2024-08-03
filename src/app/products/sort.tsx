'use client';
import { useEffect, useOptimistic, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';
import { SearchParams, SortValue } from '@/app/products/_lib/types';
import { extractSearchParams } from '@/app/products/_lib/utils';
import { LoaderButton } from './_components/skeletons/loader_btn';

export function SortProducts({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();
  const sp = extractSearchParams(searchParams);
  const [optimisticSort, setOptimisticSort] = useOptimistic(sp.sort);
  const [isPending, startTransition] = useTransition();

  const params = {
    ...(sp.page && { page: sp.page }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
    ...(sp.grid && { grid: sp.grid }),
    ...(sp.sort && { sort: '' }),
  } satisfies SearchParams;

  const handleSelectChange = (v: SortValue) => {
    params.sort = v === 'reset' ? '' : v;
    const newParams = new URLSearchParams(params);
    startTransition(() => {
      setOptimisticSort(v);
      router.push(`/products?${newParams.toString()}`);
    });
  };

  return (
    <Select name='sort' value={optimisticSort} onValueChange={handleSelectChange}>
      {isPending && optimisticSort === 'reset' ? (
        <LoaderButton />
      ) : (
        <SelectTrigger
          data-fetching={isPending ? '' : undefined}
          className='gap-1 w-28 text-xs font-medium px-1 pl-2 border-0 rounded hover:bg-muted hover:ring-1 hover:ring-input'>
          <SelectValue placeholder='Sort By' />
        </SelectTrigger>
      )}
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
        {optimisticSort && (
          <SelectItem disabled={!optimisticSort} className='p-2 text-xs' value='reset'>
            Reset
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
