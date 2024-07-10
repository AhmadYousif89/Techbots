'use client';

import { Button } from '@/components/ui/button';
import { extractSearchParams } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

type ApplyFiltersButtonProps = {};

export function ApplyFiltersButton({}: ApplyFiltersButtonProps) {
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
