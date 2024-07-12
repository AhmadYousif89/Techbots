import prisma from '@/lib/db';
import { SearchParams } from '@/lib/types';
import { extractSearchParams } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationButton } from '@/app/products/_components/pagination_button';

export async function ProductPaginationButtons(searchParams: SearchParams) {
  const { page, limit, category, sort, min, max, grid } =
    extractSearchParams(searchParams);
  const params = new URLSearchParams({ limit, category, sort, min, max, grid });

  const totalCount = await prisma.product.count({
    where: category ? { category } : undefined
  });
  const totalPages = Math.ceil(totalCount / +limit);
  const start = (+page - 1) * +limit;
  const end = start + +limit;
  const hasNextPage = end < totalCount;
  const hasPrevPage = start > 0;

  return (
    <div className='flex items-center justify-center gap-4 ml-auto'>
      <PaginationButton
        className='size-7'
        elementId='reviews'
        disabled={!hasPrevPage}
        href={`/products/?page=${+page - 1}&${params.toString()}`}>
        <ChevronLeft className='size-4' />
      </PaginationButton>
      <span className='text-xs text-muted-foreground font-semibold'>
        {page} / {totalPages}
      </span>
      <PaginationButton
        className='size-7'
        elementId='reviews'
        disabled={!hasNextPage}
        href={`/products/?page=${+page + 1}&${params.toString()}`}>
        <ChevronRight className='size-4' />
      </PaginationButton>
    </div>
  );
}
