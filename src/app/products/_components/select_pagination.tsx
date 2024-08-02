'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

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
  const [value, setValue] = useState('');

  const handleOnChange = (v: string) => {
    setValue(v);
    if (url.endsWith('products/')) router.push(`${url}?page=${v}&${params}`);
    else router.push(`${url}?page=${v}&${params}#reviews`);
  };

  return (
    <Select name='pagination' value={value ? value : page} onValueChange={handleOnChange}>
      <SelectTrigger className='[&>svg]:hidden text-xs p-1 h-auto'>
        {startingPage} / {endingPage}
      </SelectTrigger>
      <SelectContent
        align='center'
        ref={ref =>
          ref?.addEventListener('touchend', e => {
            e.preventDefault();
          })
        }>
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
