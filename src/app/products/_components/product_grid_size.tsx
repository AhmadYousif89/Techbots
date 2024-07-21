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

  const { page, limit, category, brand, sort, min, max } = extractSearchParams(
    params.entries()
  );
  const newParams = new URLSearchParams({
    ...(page && { page }),
    ...(limit && { limit }),
    ...(limit && { limit }),
    ...(category && { cat: category }),
    ...(brand && { brand }),
    ...(sort && { sort }),
    ...(min && { min }),
    ...(max && { max })
  });
  const url = () => `/products/?${newParams.toString()}`;

  return (
    <div role='group' className='hidden lg:flex items-center gap-1 col-span-full'>
      <Button
        variant='ghost'
        data-active={params.get('grid') === '2'}
        className='p-2 rounded-none ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input data-[active="true"]:shadow'
        onClick={() => {
          if (params.get('grid') === '2') {
            router.push(url());
            return;
          }
          router.push(url() + '&grid=2');
        }}>
        <Grid2x2 />
      </Button>
      <Button
        variant='ghost'
        data-active={params.get('grid') === '3'}
        className='p-2 rounded-none ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input data-[active="true"]:shadow'
        onClick={() => {
          if (params.get('grid') === '3') {
            router.push(url());
            return;
          }
          router.push(url() + '&grid=3');
        }}>
        <Grid3x3 />
      </Button>
      <Button
        variant='ghost'
        data-active={params.get('grid') === '4'}
        className='p-2 rounded-none ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input data-[active="true"]:shadow'
        onClick={() => {
          if (params.get('grid') === '4') {
            router.push(url());
            return;
          }
          router.push(url() + '&grid=4');
        }}>
        <Grid4x4 />
      </Button>
    </div>
  );
}
