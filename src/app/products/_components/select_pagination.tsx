'use client';

import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type SelectPaginationsProps = {
  page: string;
  totalPages: number;
  startingPage: number;
  endingPage: number;
  newParams: string;
};

export function SelectPaginations({
  page,
  totalPages,
  startingPage,
  endingPage,
  newParams,
}: SelectPaginationsProps) {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleOnChange = (v: string) => {
    setValue(v);
    router.push(`/products/?page=${v}&${newParams}`);
  };

  return (
    <Select name='pagination' value={value ? value : page} onValueChange={handleOnChange}>
      <SelectTrigger className='[&>svg]:hidden text-xs p-1 h-auto'>
        {startingPage} / {endingPage}
      </SelectTrigger>
      <SelectContent align='center'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <SelectItem
            key={num}
            value={num + ''}
            className='p-2 my-1 text-xs text-muted-foreground font-semibold'>
            {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
