'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
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
import { useSideMenuState } from '@/lib/store';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import { capitalizeString } from '@/lib/utils';
import { categories } from '@/app/products/_actions/actions';

export function SideMenu() {
  const { isOpen, setIsOpen } = useSideMenuState();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                userPreviewMainIdentifier: 'capitalize font-bold',
                userPreviewSecondaryIdentifier: 'font-medium',
                userButtonPopoverCard: { pointerEvents: 'initial' }
              }
            }}
          />
        </SheetHeader>
        <Separator />

        <ul className='grid gap-4 pb-4 text-sm'>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
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
                          onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'
              href='/cart'>
              Cart
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'
              href='/#blogs'>
              Blogs
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'
              href='/#footer'>
              About
            </Link>
          </li>
        </ul>

        <Separator />

        <AuthButtons />

        <Separator />

        <SheetFooter className='mt-auto sm:flex-col'>
          <SheetClose asChild className='my-4'>
            <Button variant={'outline'}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
