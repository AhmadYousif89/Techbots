import prisma from '@/lib/db';
import { cn } from '@/lib/utils';
import { SearchParams } from '../_lib/types';
import { extractSearchParams } from '../_lib/utils';
import { getFilters } from './product_grid';

type PaginationSummaryProps = {
  searchParams: SearchParams;
  className?: string;
};

export async function PaginationSummary({
  searchParams,
  className
}: PaginationSummaryProps) {
  const { page, limit } = extractSearchParams(searchParams);
  const filters = getFilters(searchParams);
  const totalCount = await prisma.product.count({ where: filters });
  const start = (+page - 1) * +limit;
  const end = start + +limit;

  return (
    <p className={cn('text-xs font-medium text-muted-foreground', className)}>
      <span className='font-semibold'>{start + 1}</span> -{' '}
      <span className='font-semibold'>{end > totalCount ? totalCount : end}</span> of{' '}
      <span className='font-semibold'>{totalCount}</span> results
    </p>
  );
}
