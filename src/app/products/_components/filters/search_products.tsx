'use client';

import { Suspense, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Category } from '../../_actions/actions';
import { capitalizeString } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchItemSkeleton } from '../skeletons/search_item_skeleton';

type Data = {
  asin: string;
  image: string;
  title: string;
  category: Category;
};
type SearchProductsProps = {
  data: Data[];
};

export function SearchProducts({ data }: SearchProductsProps) {
  const [open, setOpen] = useState(false);

  const categories = [...new Set(data.map(i => i.category))];
  const itemsByCategory = data.reduce((list, item) => {
    list[item.category] = [...(list[item.category] ?? []), item];
    return list;
  }, {} as Record<Category, typeof data>);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Button
      title='search'
      variant={'ghost'}
      className='group size-auto p-0 aspect-square rounded-full ring-2 ring-input hover:bg-input'>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type something to search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {categories.map((category, i) => (
            <Suspense key={i} fallback={<Skeleton className='w-20 h-2 bg-input' />}>
              <CommandGroup
                key={i + '-' + category}
                className='pb-4'
                heading={capitalizeString(category)}>
                {itemsByCategory[category].map((item, i) => (
                  <Suspense key={i} fallback={<SearchItemSkeleton />}>
                    <RenderCommandItems item={item} setOpen={setOpen} />
                  </Suspense>
                ))}
              </CommandGroup>
            </Suspense>
          ))}
        </CommandList>
      </CommandDialog>
      <Search
        strokeWidth={2.5}
        className='size-6 p-1 text-muted-foreground'
        onClick={() => setOpen(true)}
      />
    </Button>
  );
}

function RenderCommandItems({
  item,
  setOpen
}: {
  item: Data;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  return (
    <CommandItem className='!p-0 my-2 cursor-pointer'>
      <div
        className='flex items-center gap-4'
        onClick={() => {
          setOpen(false);
          router.push(`/products/${item.asin}`);
        }}>
        <Image
          src={item.image}
          alt={item.title}
          width={48}
          height={48}
          className='size-12'
        />
        <p className='text-xs text-muted-foreground font-medium'>
          {item.title.split(' ').slice(0, 8).join(' ')}
        </p>
      </div>
    </CommandItem>
  );
}
