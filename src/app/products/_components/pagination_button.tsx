'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SelectPaginations } from './select_pagination';

type PaginationButtonProps = {
  className?: string;
  page: string;
  params: string;
  baseUrl: string;
  totalPages: number;
  totalCount?: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  firstPageUrl: string;
  prevPageUrl: string;
  nextPageUrl: string;
  lastPageUrl: string;
};

export const PaginationButtons = (props: PaginationButtonProps) => {
  const { page, totalPages } = props;
  const [optimisticPage, setOptimisticPage] = useOptimistic(+page);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const startingPage = +page <= 0 ? 1 : +page <= totalPages ? +page : 0;
  const endingPage = totalPages >= 1 ? totalPages : 0;

  const handleOnChange = (page: number, url: string) => {
    startTransition(() => {
      setOptimisticPage(+page);
      router.push(url);
    });
  };

  return (
    <div
      data-fetching={isPending ? '' : undefined}
      className={cn('flex items-center gap-2', props.className)}>
      {props.totalPages > 2 && (
        <Button
          variant={'outline'}
          className='size-6 p-0 disabled:opacity-25'
          onClick={() => handleOnChange(startingPage, props.firstPageUrl)}
          disabled={!props.hasPrevPage}>
          <ChevronsLeft className='size-4' />
        </Button>
      )}
      <Button
        variant={'outline'}
        className='size-6 p-0 disabled:opacity-25'
        onClick={() => handleOnChange(+page - 1, props.prevPageUrl)}
        disabled={!props.hasPrevPage}>
        <ChevronLeft className='size-4' />
      </Button>
      <span className='text-xs text-muted-foreground font-semibold'>
        {props.totalPages <= 2 ? (
          <>
            {optimisticPage} / {endingPage}
          </>
        ) : (
          <SelectPaginations
            page={optimisticPage + ''}
            url={props.baseUrl}
            params={props.params}
            totalPages={props.totalPages}
            startingPage={startingPage}
            endingPage={endingPage}
          />
        )}
      </span>
      <Button
        variant={'outline'}
        className='size-6 p-0 disabled:opacity-25'
        onClick={() => handleOnChange(+page + 1, props.nextPageUrl)}
        disabled={!props.hasNextPage}>
        <ChevronRight className='size-4' />
      </Button>
      {props.totalPages > 2 && (
        <Button
          variant={'outline'}
          className='size-6 p-0 disabled:opacity-25'
          onClick={() => handleOnChange(endingPage, props.lastPageUrl)}
          disabled={!props.hasNextPage}>
          <ChevronsRight className='size-4' />
        </Button>
      )}
    </div>
  );
};
