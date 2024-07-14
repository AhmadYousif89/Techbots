'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { extractSearchParams } from '@/app/products/_lib/utils';
import { PaginationButton } from '@/app/products/_components/pagination_button';

type PaginationSectionProps = {
  asin: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
};

export function ReviewsPaginationButtons({
  asin,
  hasPrevPage,
  hasNextPage,
  totalPages
}: PaginationSectionProps) {
  const router = useRouter();
  const params = useSearchParams();
  const { page, limit, selectedRating, category } = extractSearchParams(
    params.entries(),
    '5'
  );

  let reviewsTitle = 'Top Reviews';
  for (let i = 0; i < 5; i++) {
    if (selectedRating === `${5 - i}`) {
      reviewsTitle = `${5 - i} Star Reviews`;
      break;
    }
  }

  return (
    <div className='flex justify-between items-center'>
      <h3 className='font-medium text-xl mb-auto'>{reviewsTitle}</h3>
      <div className='grid items-center gap-y-2'>
        <Button
          size='sm'
          variant='outline'
          className='place-self-center'
          disabled={!selectedRating}
          onClick={() => {
            router.push(
              `/products/${asin}?page=1&limit=${limit}&cat=${category}&sr=#reviews`
            );
          }}>
          View All
        </Button>

        <div className='flex items-center gap-4'>
          <PaginationButton
            elementId='reviews'
            disabled={!hasPrevPage}
            href={`/products/${asin}?page=${
              +page - 1
            }&limit=${limit}&cat=${category}&sr=${selectedRating}#reviews`}>
            <ChevronLeft />
          </PaginationButton>
          <span className='text-foreground text-sm'>
            {page} / {totalPages}
          </span>
          <PaginationButton
            elementId='reviews'
            disabled={!hasNextPage}
            href={`/products/${asin}?page=${
              +page + 1
            }&limit=${limit}&cat=${category}&sr=${selectedRating}#reviews`}>
            <ChevronRight />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}
