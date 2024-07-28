'use client';
import { use } from 'react';
import { ChevronLeft } from 'lucide-react';
import { capitalizeString } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFilter } from '../../_store/filters';
import { useSearchParams } from 'next/navigation';

export function FilterContentCategory({ data }: { data: Promise<string[]> }) {
  const categories = use(data);
  const params = useSearchParams();
  const { selectedCategory, setCategory, clearSelectedCategory } = useFilter(
    s => s.category
  );

  const hasFilterCategory = selectedCategory.length > 0;

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-medium text-muted-foreground'>Category</h3>
        {hasFilterCategory && (
          <Button
            variant={'link'}
            onClick={() => clearSelectedCategory()}
            className='gap-1 text-xs py-0 h-auto font-medium text-muted-foreground hover:text-destructive'>
            <ChevronLeft className='size-3' /> Clear
          </Button>
        )}
      </div>
      <div className='px-2 grid grid-cols-[repeat(2,minmax(auto,1fr))] gap-y-2 md:gap-x-8 space-y-1'>
        {categories.map(category => (
          <div key={category} className='flex items-center gap-2'>
            <Input
              id={category}
              name={category}
              type='checkbox'
              className='w-4 h-4 cursor-pointer'
              checked={selectedCategory.includes(category)}
              onChange={e => setCategory(e.target.name)}
            />
            <Label
              htmlFor={category}
              className='text-xs cursor-pointer hover:text-muted-foreground'>
              {capitalizeString(category)}
            </Label>
          </div>
        ))}
      </div>
    </section>
  );
}
