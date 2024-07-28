import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SelectPaginations } from './select_pagination';

type PaginationButtonProps = {
  className?: string;
  page: string;
  params: string;
  baseUrl: string;
  startingPage: number;
  endingPage: number;
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
  return (
    <div className={cn('flex items-center gap-2', props.className)}>
      {props.totalPages > 2 && (
        <Button
          variant={'outline'}
          className='size-6 p-0 disabled:opacity-25'
          disabled={!props.hasPrevPage}>
          <Link href={props.firstPageUrl}>
            <ChevronsLeft className='size-4' />
          </Link>
        </Button>
      )}
      <Button
        variant={'outline'}
        className='size-6 p-0 disabled:opacity-25'
        disabled={!props.hasPrevPage}>
        <Link href={props.prevPageUrl}>
          <ChevronLeft className='size-4' />
        </Link>
      </Button>
      <span className='text-xs text-muted-foreground font-semibold'>
        {props.totalPages <= 2 ? (
          <>
            {props.startingPage} / {props.endingPage}
          </>
        ) : (
          <SelectPaginations
            page={props.page}
            url={props.baseUrl}
            params={props.params}
            startingPage={props.startingPage}
            endingPage={props.endingPage}
            totalPages={props.totalPages}
          />
        )}
      </span>
      <Button
        variant={'outline'}
        className='size-6 p-0 disabled:opacity-25'
        disabled={!props.hasNextPage}>
        <Link href={props.nextPageUrl}>
          <ChevronRight className='size-4' />
        </Link>
      </Button>
      {props.totalPages > 2 && (
        <Button
          variant={'outline'}
          className='size-6 p-0 disabled:opacity-25'
          disabled={!props.hasNextPage}>
          <Link href={props.lastPageUrl}>
            <ChevronsRight className='size-4' />
          </Link>
        </Button>
      )}
    </div>
  );
};
