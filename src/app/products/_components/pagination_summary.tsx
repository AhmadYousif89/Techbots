import prisma from '@/lib/db';
import { SearchParams } from '@/lib/types';
import { cn, extractSearchParams } from '@/lib/utils';

type PaginationSummaryProps = {
  searchParams: SearchParams;
  className?: string;
};

export async function PaginationSummary({
  searchParams,
  className
}: PaginationSummaryProps) {
  const { page, limit, category } = extractSearchParams(searchParams);
  const totalCount = await prisma.product.count({
    where: category ? { category } : undefined
  });
  const start = (+page - 1) * +limit;
  const end = start + +limit;

  return (
    <p className={cn('text-xs font-medium text-muted-foreground', className)}>
      Showing <span className='font-semibold'>{start + 1}</span> -{' '}
      <span className='font-semibold'>{end}</span> of{' '}
      <span className='font-semibold'>{totalCount}</span> results
    </p>
  );
}
