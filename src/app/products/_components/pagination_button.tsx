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
        <Link className='grid' href={props.firstPageUrl}>
          <Button
            variant={'outline'}
            className='size-6 p-0 disabled:opacity-25'
            disabled={!props.hasPrevPage}>
            <ChevronsLeft className='size-4' />
          </Button>
        </Link>
      )}
      <Link className='grid' href={props.prevPageUrl}>
        <Button
          variant={'outline'}
          className='size-6 p-0 disabled:opacity-25'
          disabled={!props.hasPrevPage}>
          <ChevronLeft className='size-4' />
        </Button>
      </Link>
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
      <Link className='grid' href={props.nextPageUrl}>
        <Button
          variant={'outline'}
          className='size-6 p-0 disabled:opacity-25'
          disabled={!props.hasNextPage}>
          <ChevronRight className='size-4' />
        </Button>
      </Link>
      {props.totalPages > 2 && (
        <Link className='grid' href={props.lastPageUrl}>
          <Button
            variant={'outline'}
            className='size-6 p-0 disabled:opacity-25'
            disabled={!props.hasNextPage}>
            <ChevronsRight className='size-4' />
          </Button>
        </Link>
      )}
    </div>
  );
};
