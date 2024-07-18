'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Grid2x2 } from '@/icons/grid2x2';
import { Grid3x3 } from '@/icons/grid3x3';
import { Grid4x4 } from '@/icons/grid4x4';
import { extractSearchParams } from '@/app/products/_lib/utils';

export function ProductGridSize() {
  const router = useRouter();
  const params = useSearchParams();

  const { page, limit, category, sort, min, max } = extractSearchParams(params.entries());
  const newParams = new URLSearchParams({
    page,
    limit,
    cat: category,
    sort,
    min,
    max
  });
  const url = (grid: string) => `/products/?${newParams.toString()}&grid=${grid}`;

  return (
    <div role='group' className='hidden lg:flex items-center gap-1 col-span-full'>
      <Button
        variant='ghost'
        data-active={params.get('grid') === '2'}
        className='p-2 border border-transparent hover:bg-transparent data-[active="true"]:border-input data-[active="true"]:shadow-sm'
        onClick={() => {
          if (params.get('grid') === '2') {
            router.push(url(''));
            return;
          }
          router.push(url('2'));
        }}>
        <Grid2x2 />
      </Button>
      <Button
        variant='ghost'
        data-active={params.get('grid') === '3'}
        className='p-2 border border-transparent hover:bg-transparent data-[active="true"]:border-input data-[active="true"]:shadow-sm'
        onClick={() => {
          if (params.get('grid') === '3') {
            router.push(url(''));
            return;
          }
          router.push(url('3'));
        }}>
        <Grid3x3 />
      </Button>
      <Button
        variant='ghost'
        data-active={params.get('grid') === '4'}
        className='p-2 border border-transparent hover:bg-transparent data-[active="true"]:border-input data-[active="true"]:shadow-sm'
        onClick={() => {
          if (params.get('grid') === '4') {
            router.push(url(''));
            return;
          }
          router.push(url('4'));
        }}>
        <Grid4x4 />
      </Button>
    </div>
  );
}
