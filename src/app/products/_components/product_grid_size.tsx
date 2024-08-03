'use client';

import { useOptimistic, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractSearchParams } from '@/app/products/_lib/utils';

import { Grid2x2 } from '@/icons/grid2x2';
import { Grid3x3 } from '@/icons/grid3x3';
import { Grid4x4 } from '@/icons/grid4x4';
import { Button } from '@/components/ui/button';

export function ProductGridSize() {
  const router = useRouter();
  const params = useSearchParams();
  const sp = extractSearchParams(params.entries());
  const [optimisticGrid, setOptimisticGrid] = useOptimistic(sp.grid);
  const [isPending, startTransition] = useTransition();

  const newParams = new URLSearchParams({
    ...(sp.page && { page: sp.page }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
  });
  const ps = newParams.toString();

  const handleGridChange = (value: string) => {
    startTransition(() => {
      if (optimisticGrid === value) {
        router.push(`/products?${ps}`);
        return;
      }
      setOptimisticGrid(value);
      router.push(`/products?${ps}&grid=${value}`);
    });
  };

  return (
    <div
      // data-pending={isPending ? '' : undefined}
      className='hidden lg:flex items-center gap-1 col-span-full'>
      <Button
        variant='ghost'
        data-active={optimisticGrid === '2'}
        className='p-2 rounded-none ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input data-[active="true"]:shadow'
        onClick={() => handleGridChange('2')}>
        <Grid2x2 />
      </Button>
      <Button
        variant='ghost'
        data-active={optimisticGrid === '3'}
        className='p-2 rounded-none ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input data-[active="true"]:shadow'
        onClick={() => handleGridChange('3')}>
        <Grid3x3 />
      </Button>
      <Button
        variant='ghost'
        data-active={optimisticGrid === '4'}
        className='p-2 rounded-none ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input data-[active="true"]:shadow'
        onClick={() => handleGridChange('4')}>
        <Grid4x4 />
      </Button>
    </div>
  );
}
