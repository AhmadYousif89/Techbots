'use client';
import Link from 'next/link';
import { cn, capitalizeString } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import { extractSearchParams } from '@/app/products/_lib/utils';

export function CategoryNavMenu({ data }: { data: Promise<string[]> }) {
  let categories = use(data);
  categories = categories.filter(cat => !cat.startsWith('smart'));
  const params = useSearchParams();
  const { page, limit, sort, brand, min, max, grid } = extractSearchParams(
    params.entries()
  );
  const newParams = new URLSearchParams({
    ...(page && { page }),
    ...(limit && { limit }),
    ...(brand && { brand }),
    ...(sort && { sort }),
    ...(min && { min }),
    ...(max && { max }),
    ...(grid && { grid })
  });
  const end = 14;
  const cats = categories.length > end ? categories.slice(0, end) : categories;
  const url = (cat: string) => `/products/?cat=${cat}&${newParams.toString()}`;

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='cats-1' className='group border-b-0'>
        <AccordionTrigger className='text-secondary text-xs underline-offset-4 gap-1'>
          Categories
        </AccordionTrigger>
        <Card
          className={cn(
            'absolute left-1/2 -translate-x-1/2 top-[100%]',
            'bg-primary/85 backdrop-blur-sm w-full',
            'border-0 rounded-none group-data-[state="open"]:border-t max-view'
          )}>
          <AccordionContent className='grid p-2 max-view mx-auto'>
            <div className='flex items-center justify-evenly'>
              {cats.map(category => (
                <Button
                  asChild
                  key={category}
                  variant={'link'}
                  aria-selected={category === params.get('cat')}
                  onClick={() => {
                    console.log('newParams: ', newParams.toString());
                    console.log('url: ', url(category));
                  }}
                  className='px-0 text-secondary text-xs aria-selected:text-blue-400 aria-selected:underline'>
                  <Link href={url(category)}>{capitalizeString(category)}</Link>
                </Button>
              ))}
            </div>
            {categories.length > end && (
              <Accordion type='single' collapsible>
                <AccordionItem value='cats-2' className='border-b-0'>
                  <AccordionContent>
                    <div className='flex flex-wrap gap-x-12 items-center justify-center'>
                      {categories.slice(end).map(category => (
                        <Button
                          asChild
                          key={category}
                          variant={'link'}
                          className='px-0 text-secondary text-xs'>
                          <Link href={url(category)}>{capitalizeString(category)}</Link>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                  <AccordionTrigger className='text-secondary text-xs justify-center underline-offset-4 p-0 pb-2 gap-1'></AccordionTrigger>
                </AccordionItem>
              </Accordion>
            )}
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
