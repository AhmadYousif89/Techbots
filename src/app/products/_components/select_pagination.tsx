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
  const [optimisticPage, setOptimisticPage] = useOptimistic(page);
  const [isPending, startTransition] = useTransition();

  const handleOnChange = (v: string) => {
    startTransition(() => {
      setOptimisticPage(v);
      if (url.endsWith('products/')) router.push(`${url}?page=${v}${params}`);
      else router.push(`${url}?page=${v}${params}#reviews`);
    });
  };

  return (
    <Select name='pagination' value={optimisticPage} onValueChange={handleOnChange}>
      <SelectTrigger
        data-fetching={isPending ? '' : undefined}
        className='[&>svg]:hidden text-xs p-1 h-auto'>
        <SelectValue>
          {startingPage} / {endingPage}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <SelectItem
            key={num}
            value={num + ''}
            className='select-item p-2 my-1 text-xs text-muted-foreground font-semibold select-none'>
            {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
