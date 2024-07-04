'use client';

import { useState } from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Logo } from './logo';
import Link from 'next/link';
import { AuthButtons } from './auth/auth_buttons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';
import { categories } from '@/lib/store';
import { UserButton, useAuth } from '@clerk/nextjs';
import { capitalizeString } from '@/lib/utils';

export function SideMenu() {
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size={'sm'}
          variant={'secondary'}
          className='size-7 p-1 rounded-full bg-zinc-100 lg:hidden'>
          <svg
            className='size-[20px] stroke-foreground'
            fill='none'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={3}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </Button>
      </SheetTrigger>

      <SheetContent side={'left'} className='flex flex-col'>
        <SheetHeader className='flex-row items-center justify-between pt-4'>
          <SheetTitle>
            <Logo className='text-foreground font-medium' />
          </SheetTitle>
        </SheetHeader>
        <Separator />

        <ul className='grid gap-4 pb-4 text-sm'>
          <li>
            <Link
              onClick={() => setOpen(false)}
              href='/products'
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'>
              Shop
            </Link>
          </li>
          <li>
            <Accordion type='single' collapsible>
              <AccordionItem value='coupon'>
                <AccordionTrigger className='py-0 pb-4 text-xs hover:text-foreground/70 uppercase'>
                  Categories
                </AccordionTrigger>
                <AccordionContent>
                  <ul className='py-2 grid grid-cols-2 gap-x-4'>
                    {categories.map(category => (
                      <li key={category}>
                        <Link
                          onClick={() => setOpen(false)}
                          href={`/products?category=${category}`}
                          className='p-1 text-xs inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'>
                          {capitalizeString(category)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <Link
              onClick={() => setOpen(false)}
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'
              href='/cart#cart-list'>
              Cart
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setOpen(false)}
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'
              href='/'>
              Blogs
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setOpen(false)}
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'
              href='/'>
              About
            </Link>
          </li>
        </ul>

        <Separator />

        {!userId ? (
          <>
            <AuthButtons />
            <Separator />
          </>
        ) : null}

        <SheetFooter className='mt-auto'>
          <SheetClose asChild className='my-4'>
            <Button variant={'outline'}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
