'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '../ui/button';
import { Grid2x2 } from '@/icons/grid2x2';
import { Grid3x3 } from '@/icons/grid3x3';
import { Grid4x4 } from '@/icons/grid4x4';

export function ProductGridSize() {
  const router = useRouter();
  const params = useSearchParams();
  // extract page, limit, and category from the URL
  const page = params.get('page') ?? '1';
  const limit = params.get('limit') ?? '8';
  const category = params.get('category') ?? '';
  // construct the URL for the grid size buttons
  const url = (grid: string) =>
    `/products/?page=${page}&limit=${limit}&category=${category}&grid=${grid}`;

  return (
    <div role='group' className='hidden lg:flex items-center gap-4 col-span-full'>
      <Button
        variant='ghost'
        className='p-0 hover:bg-transparent'
        onClick={() => {
          router.push(url('2'));
        }}>
        <Grid2x2 />
      </Button>
      <Button
        variant='ghost'
        className='p-0 hover:bg-transparent'
        onClick={() => {
          router.push(url('3'));
        }}>
        <Grid3x3 />
      </Button>
      <Button
        variant='ghost'
        className='p-0 hover:bg-transparent'
        onClick={() => {
          router.push(url('4'));
        }}>
        <Grid4x4 />
      </Button>
    </div>
  );
}
