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
import { categories } from '../../data';

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={'sm'}
          variant={'secondary'}
          className='size-8 p-0 rounded-full bg-zinc-100 lg:hidden'>
          <svg
            className='w-[22px] h-[22px] stroke-foreground'
            fill='none'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </Button>
      </SheetTrigger>

      <SheetContent side={'left'} className='flex flex-col'>
        <SheetHeader className='text-start py-4'>
          <SheetTitle className=''>
            <Logo className='text-foreground font-medium text-lg' />
          </SheetTitle>
          <Separator />
        </SheetHeader>

        <ul className='grid gap-4 pb-4 text-sm'>
          <li className=''>
            <Link
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
                  <ul className='py-2'>
                    {categories.map(category => (
                      <li key={category.id}>
                        <Link
                          href={`/products?category=${category.link}`}
                          className='py-1 mx-4 text-xs inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'>
                          {category.name}
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
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'
              href='/cart#cart-items'>
              Cart
            </Link>
          </li>
          <li>
            <Link
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'
              href='/blogs'>
              Blogs
            </Link>
          </li>
          <li>
            <Link
              className='pb-1 w-full inline-block border-b-[1px] border-transparent hover:text-foreground/70 hover:border-b-foreground/15'
              href='/about'>
              About
            </Link>
          </li>
        </ul>

        <Separator />

        <AuthButtons />

        <Separator />

        <SheetFooter className='mt-auto'>
          <SheetClose asChild className='my-4'>
            <Button variant={'outline'}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
