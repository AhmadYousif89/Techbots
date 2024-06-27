import { Computer, Copyright } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className='grid gap-8 md:gap-y-0 md:gap-x-4 text-white px-6 xl:px-0 py-28 mx-auto lg:max-w-screen-xl md:grid-cols-2'>
      <Logo className='text-2xl col-[1] place-self-start' />

      <section className='space-y-2 col-[1]'>
        <h3 className='text-xl font-bold'>About Us</h3>
        <p className='text-sm max-w-prose'>
          TechBots is a leading online store for electronic gadgets. We provide a wide
          range of products at affordable prices.
        </p>
      </section>

      <section className='space-y-2 md:col-[2] md:row-start-1 md:row-end-3'>
        <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
        <div className='grid grid-cols-2 '>
          <div className='grid gap-4 pl-4'>
            <p className='text-lg text-zinc-400 font-semibold'>Main</p>
            <ul>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    Products
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    Blogs
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    About
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <div className='grid gap-4 pl-4'>
            <p className='text-lg text-zinc-400 font-semibold'>Categories</p>
            <ul>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    Products
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    Blogs
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    About
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  <Button variant={'link'} className='pl-0 text-secondary'>
                    Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className='space-y-2 col-[1]'>
        <h3 className='text-xl font-bold'>Contact Us</h3>
        <p className='text-sm'>98 Betty St, San Francisco, CA 1234, USA</p>
      </section>

      <p className='flex items-center gap-1 text-xs mt-8 text-muted-foreground font-semibold col-[1]'>
        Copyright <Copyright size={14} /> 2024 - TechBots
      </p>
    </footer>
  );
}
