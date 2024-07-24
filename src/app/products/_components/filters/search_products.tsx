import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

import prisma from '@/lib/db';
import { cache } from '@/lib/cache';
import { Search } from 'lucide-react';
import { capitalizeString } from '@/lib/utils';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Category } from '@/app/products/_lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type Data = {
  asin: string;
  title: string;
  mainImage: string;
  category: Category;
};

const day = 60 * 60 * 24;

const getSearchedProducts = cache(
  async () => {
    return prisma.product.findMany({
      select: {
        asin: true,
        title: true,
        category: true,
        mainImage: true,
      },
    }) as Promise<Data[]>;
  },
  ['/products', 'getSearchedProducts'],
  { revalidate: day }
);

export async function SearchProducts() {
  let categories: Category[] = [];
  let itemsByCategory: Record<string, Data[]> = {};
  try {
    const data = await getSearchedProducts();

    categories = [...new Set(data.map(i => i.category))];
    itemsByCategory = data.reduce((list: Record<string, Data[]>, p) => {
      const item: Data = {
        asin: p.asin,
        title: p.title,
        mainImage: p.mainImage,
        category: p.category as Category,
      };
      list[p.category] = [...(list[p.category] ?? []), item];
      return list;
    }, {});
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch search data!');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title='search'
          variant={'ghost'}
          className='group size-auto p-0 aspect-square rounded-full ring-2 ring-input hover:bg-input'>
          <Search strokeWidth={2.5} className='size-6 p-1 text-muted-foreground' />
        </Button>
      </DialogTrigger>
      <DialogContent className='p-4'>
        <Command>
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
                    <CommandItem key={i} className='!p-0 my-2 cursor-pointer'>
                      <Link
                        href={`/products/${item.asin}?cat=${item.category}`}
                        className='flex items-center gap-4'>
                        <Image
                          src={item.mainImage}
                          alt={item.title}
                          width={48}
                          height={48}
                          className='size-12'
                        />
                        <p className='text-xs text-muted-foreground font-medium'>
                          {item.title.split(' ').slice(0, 8).join(' ')}
                        </p>
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Suspense>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
