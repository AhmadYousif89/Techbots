'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectPaginationsProps = {
  page: string;
  totalPages: number;
  startingPage: number;
  endingPage: number;
  params: string;
  url: string;
};

export function SelectPaginations({
  page,
  totalPages,
  startingPage,
  endingPage,
  params,
  url,
}: SelectPaginationsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticPage, setOptimisticPage] = useOptimistic(page);

  const handleOnChange = (p: string) => {
    startTransition(() => {
      setOptimisticPage(p);
      if (url.endsWith('products/')) router.push(`${url}?page=${p}${params}`);
      else router.push(`${url}?page=${p}${params}#reviews`);
    });
  };

  return (
    <Select name='pagination' value={optimisticPage} onValueChange={handleOnChange}>
      <SelectTrigger
        // data-pending={isPending ? '' : undefined}
        className='[&>svg]:hidden text-xs p-1 px-2 h-auto hover:bg-muted'>
        <SelectValue placeholder='Page'>
          {startingPage} / {endingPage}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align='center'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <SelectItem
            key={page}
            value={page.toString()}
            className='select-item p-2 my-1 text-xs text-muted-foreground font-semibold select-none'>
            {page}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
