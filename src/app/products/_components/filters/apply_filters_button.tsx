'use client';

import { useSearchParams } from 'next/navigation';
import { extractSearchParams } from '@/app/products/_lib/utils';
import { Button } from '@/components/ui/button';

export function ApplyFiltersButton() {
  const params = useSearchParams();
  const { page, limit, category, sort, min, max, grid } = extractSearchParams(
    params.entries()
  );
  const newQueryParams = new URLSearchParams({
    page,
    limit,
    category,
    sort,
    min,
    max,
    grid
  });

  return (
    <Button
      size={'sm'}
      variant={min || max ? 'outline' : 'link'}
      disabled={!min || !max}
      className='relative text-xs'>
      {min || max ? 'Apply' : 'Reset'}
    </Button>
  );
}
