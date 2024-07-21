import prisma from '@/lib/db';
import { SearchParams } from '@/app/products/_lib/types';
import { extractSearchParams } from '@/app/products/_lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { PaginationButton } from '@/app/products/_components/pagination_button';
import { getFilters } from './product_grid';

export async function ProductPaginationButtons(searchParams: SearchParams) {
  const { page, limit, category, brand, sort, min, max, grid } =
    extractSearchParams(searchParams);
  const params = new URLSearchParams({
    ...(limit && { limit }),
    ...(category && { category }),
    ...(brand && { brand }),
    ...(sort && { sort }),
    ...(min && { min }),
    ...(max && { max }),
    ...(grid && { grid })
  });

  const filters = getFilters(searchParams);
  const totalCount = await prisma.product.count({ where: filters });
  const totalPages = Math.ceil(totalCount / +limit);
  const start = (+page - 1) * +limit;
  const end = start + +limit;
  const hasNextPage = end < totalCount;
  const hasPrevPage = start > 0;

  return (
    <div className='flex items-center justify-center gap-2 ml-auto'>
      {totalPages > 2 && (
        <PaginationButton
          className='size-6 p-1 disabled:opacity-25'
          elementId='reviews'
          disabled={!hasPrevPage}
          href={`/products/?page=${
            +page - totalPages > 0 ? +page - totalPages : 1
          }&${params.toString()}`}>
          <ChevronsLeft />
        </PaginationButton>
      )}
      <PaginationButton
        className='size-6 p-1 disabled:opacity-25'
        elementId='reviews'
        disabled={!hasPrevPage}
        href={`/products/?page=${+page - 1}&${params.toString()}`}>
        <ChevronLeft />
      </PaginationButton>
      <span className='text-xs text-muted-foreground font-semibold'>
        {page} / {totalPages}
      </span>
      <PaginationButton
        className='size-6 p-1 disabled:opacity-25'
        elementId='reviews'
        disabled={!hasNextPage}
        href={`/products/?page=${+page + 1}&${params.toString()}`}>
        <ChevronRight />
      </PaginationButton>
      {totalPages > 2 && (
        <PaginationButton
          className='size-6 p-1 disabled:opacity-25'
          elementId='reviews'
          disabled={!hasNextPage}
          href={`/products/?page=${
            +page + totalPages < totalPages ? +page + totalPages : totalPages
          }&${params.toString()}`}>
          <ChevronsRight />
        </PaginationButton>
      )}
    </div>
  );
}
