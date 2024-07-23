import prisma from '@/lib/db';
import { getFilters } from './product_grid';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { SearchParams } from '../_lib/types';
import { extractSearchParams } from '../_lib/utils';
import { SelectPaginations } from './select_pagination';
import { PaginationButton } from '../_components/pagination_button';

export async function ProductPaginationButtons(searchParams: SearchParams) {
  const sp = extractSearchParams(searchParams);
  const filters = getFilters(searchParams);
  const totalCount = await prisma.product.count({ where: filters });

  const { page, limit } = sp;
  const limitPerPage = +limit <= 0 ? 8 : +limit;
  const totalPages = Math.ceil(totalCount / limitPerPage);
  const start = (+page <= 0 ? 0 : +page - 1) * limitPerPage;
  const end = start + limitPerPage;
  const hasNextPage = end < totalCount;
  const hasPrevPage = start > 0;

  if (+page > totalPages || +page <= 0) {
    return null;
  }

  const newParams = new URLSearchParams({
    ...(sp.limit && { limit: sp.limit }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
    ...(sp.grid && { grid: sp.grid }),
  });

  const firstPageUrl = `/products/?page=1&${newParams.toString()}`;
  const nextPageUrl = `/products/?page=${+page + 1}&${newParams.toString()}`;
  const prevPageUrl = `/products/?page=${+page - 1}&${newParams.toString()}`;
  const lastPageUrl = `/products/?page=${totalPages}&${newParams.toString()}`;

  const startingPage = +page <= 0 ? 1 : +page <= totalPages ? +page : 0;
  const endingPage = totalPages >= 1 ? totalPages : 0;

  return (
    <div className='flex items-center justify-center gap-2 ml-auto'>
      {totalPages > 2 && (
        <PaginationButton
          className='size-6 p-1 disabled:opacity-25'
          elementId='reviews'
          disabled={!hasPrevPage || totalCount === 0}
          href={firstPageUrl}>
          <ChevronsLeft />
        </PaginationButton>
      )}
      <PaginationButton
        className='size-6 p-1 disabled:opacity-25'
        elementId='reviews'
        disabled={!hasPrevPage || (totalCount === 0 && totalPages < 1)}
        href={prevPageUrl}>
        <ChevronLeft />
      </PaginationButton>
      <span className='text-xs text-muted-foreground font-semibold'>
        {totalPages <= 2 ? (
          <>
            {startingPage} / {endingPage}
          </>
        ) : (
          <SelectPaginations
            page={page}
            newParams={newParams.toString()}
            startingPage={startingPage}
            endingPage={endingPage}
            totalPages={totalPages}
          />
        )}
      </span>
      <PaginationButton
        className='size-6 p-1 disabled:opacity-25'
        elementId='reviews'
        disabled={!hasNextPage || totalCount === 0}
        href={nextPageUrl}>
        <ChevronRight />
      </PaginationButton>
      {totalPages > 2 && (
        <PaginationButton
          className='size-6 p-1 disabled:opacity-25'
          elementId='reviews'
          disabled={!hasNextPage || totalCount === 0}
          href={lastPageUrl}>
          <ChevronsRight />
        </PaginationButton>
      )}
    </div>
  );
}
