import Link from 'next/link';
import { SearchParams } from '../../_lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { extractSearchParams } from '../../_lib/utils';
import { PaginationButton } from '../../_components/pagination_button';

type PaginationSectionProps = {
  asin: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  searchParams: SearchParams;
};

export function ReviewsPaginationButtons({
  asin,
  hasPrevPage,
  hasNextPage,
  totalPages,
  searchParams,
}: PaginationSectionProps) {
  const { page, limit, selectedRating, category } = extractSearchParams(
    searchParams,
    '5'
  );
  const params = new URLSearchParams({
    ...(limit && { limit }),
    ...(category && { cat: category }),
    ...(selectedRating && { sr: selectedRating }),
  });

  let reviewsTitle = 'Top Reviews';
  for (let i = 0; i < 5; i++) {
    if (selectedRating === `${5 - i}`) {
      reviewsTitle = `${5 - i} Star Reviews`;
      break;
    }
  }

  const resetUrl = `/products/${asin}?page=1&limit=5&cat=${category}#reviews`;
  const nextPageUrl = `/products/${asin}?page=${+page + 1}&${params.toString()}#reviews`;
  const prevPageUrl = `/products/${asin}?page=${+page - 1}&${params.toString()}#reviews`;

  return (
    <div className='flex justify-between items-center'>
      <h3 className='font-medium text-xl mb-auto'>{reviewsTitle}</h3>
      <div className='grid items-center gap-y-2'>
        <Button
          size='sm'
          variant='outline'
          className='place-self-center'
          disabled={!selectedRating}>
          <Link href={resetUrl}>View All</Link>
        </Button>

        <div className='flex items-center gap-4'>
          <PaginationButton
            className='size-7 p-1'
            elementId='reviews'
            disabled={!hasPrevPage}
            href={prevPageUrl}>
            <ChevronLeft />
          </PaginationButton>
          <span className='text-muted-foreground font-medium text-sm'>
            {page} / {totalPages}
          </span>
          <PaginationButton
            className='size-7 p-1'
            elementId='reviews'
            disabled={!hasNextPage}
            href={nextPageUrl}>
            <ChevronRight />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}
