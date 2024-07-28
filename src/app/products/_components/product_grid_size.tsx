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

  const sp = extractSearchParams(params.entries());
  const newParams = new URLSearchParams({
    ...(sp.page && { page: sp.page }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
  });
  const url = () => `/products/?${newParams.toString()}`;

  return (
    <div role='group' className='hidden lg:flex items-center gap-1 col-span-full'>
      <Button
        variant='ghost'
        data-active={sp.grid === '2'}
        className='p-2 rounded-none ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input data-[active="true"]:shadow'
        onClick={() => {
          if (sp.grid === '2') {
            router.push(url());
            return;
          }
          router.push(url() + '&grid=2');
        }}>
        <Grid2x2 />
      </Button>
      <Button
        variant='ghost'
        data-active={sp.grid === '3'}
        className='p-2 rounded-none ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input data-[active="true"]:shadow'
        onClick={() => {
          if (sp.grid === '3') {
            router.push(url());
            return;
          }
          router.push(url() + '&grid=3');
        }}>
        <Grid3x3 />
      </Button>
      <Button
        variant='ghost'
        data-active={sp.grid === '4'}
        className='p-2 rounded-none ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input data-[active="true"]:shadow'
        onClick={() => {
          if (sp.grid === '4') {
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
