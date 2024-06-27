import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaginationButton from './pagination_button';

type ReviewsPaginationProps = {
  pId: number;
  page: number;
  limit: number;
  selectedRating: string;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export function ReviewsPagination({
  pId,
  page,
  limit,
  selectedRating,
  totalPages,
  hasNextPage,
  hasPrevPage
}: ReviewsPaginationProps) {
  return (
    <div className='flex items-center gap-4'>
      <PaginationButton
        reviewsSectionId='reviews'
        isDisabled={!hasPrevPage}
        href={`/products/${pId}?page=${
          page - 1
        }&limit=${limit}&filterByRating=${selectedRating}#reviews`}>
        <ChevronLeft />
      </PaginationButton>
      <span className='text-foreground text-sm'>
        {page} / {totalPages}
      </span>
      <PaginationButton
        reviewsSectionId='reviews'
        isDisabled={!hasNextPage}
        href={`/products/${pId}?page=${
          page + 1
        }&limit=${limit}&filterByRating=${selectedRating}#reviews`}>
        <ChevronRight />
      </PaginationButton>
    </div>
  );
}
