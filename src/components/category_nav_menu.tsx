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
import { categories } from '@/app/products/_lib/types';

export function CategoryNavMenu() {
  const end = 12;
  const cats = categories.length > end ? categories.slice(0, end) : categories;

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
            'border-0 rounded-none group-data-[state="open"]:border-t max-w-screen-xl'
          )}>
          <AccordionContent className='grid p-2 max-w-screen-xl mx-auto'>
            <div className='flex items-center justify-evenly'>
              {cats.map(category => (
                <Button
                  key={category}
                  asChild
                  variant={'link'}
                  className='px-0 text-secondary justify-normal underline-offset-8 text-xs'>
                  <Link href={`/products?cat=${category}`}>
                    {capitalizeString(category)}
                  </Link>
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
                          key={category}
                          asChild
                          variant={'link'}
                          className='px-0 text-secondary justify-normal underline-offset-8 text-xs'>
                          <Link href={`/products?cat=${category}`}>
                            {capitalizeString(category)}
                          </Link>
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
