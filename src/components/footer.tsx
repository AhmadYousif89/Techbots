import { Computer, Copyright } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Logo } from './logo';
import { Separator } from './ui/separator';
import { categories } from '@/lib/store';
import { capitalizeString } from '@/lib/utils';

export function Footer() {
  return (
    <footer id='footer' className='mt-8 px-6 py-20 lg:p-20 bg-background'>
      <div className='grid gap-8 text-primary lg:gap-y-0 lg:gap-x-4 lg:grid-cols-2 max-w-screen-md mx-auto lg:max-w-screen-xl'>
        <div className='lg:w-1/2'>
          <Logo className='text-2xl text-primary col-[1] place-self-start mb-2' />
          <Separator />
        </div>

        <section className='space-y-2 col-[1]'>
          <div className='lg:w-1/2'>
            <h3 className='text-xl font-bold mb-2'>About Us</h3>
            <Separator />
          </div>

          <p className='text-sm font-medium text-balance max-w-[50ch] pt-2'>
            TechBots is a leading online shop for computers equipments and electronic
            gadgets. We provide a wide range of products at affordable prices and a highly
            detailed product specifications.
          </p>
        </section>

        <section className='lg:col-[2] lg:row-start-1 lg:row-end-3'>
          <div className='mb-4'>
            <h3 className='text-xl font-bold mb-2'>Quick Links</h3>
            <Separator />
          </div>

          <div className='grid grid-cols-2 justify-between gap-4'>
            <div className='flex flex-col gap-4 pl-4'>
              <p className='text-lg font-medium text-muted-foreground'>Main</p>
              <ul className='border-l'>
                <li>
                  <Link href={'/'}>
                    <Button variant={'link'} className='text-xs sm:text-sm'>
                      Home
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href={'/products'}>
                    <Button variant={'link'} className='text-xs sm:text-sm'>
                      Products
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href={'/#blogs'}>
                    <Button variant={'link'} className='text-xs sm:text-sm'>
                      Blogs
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href={'/cart'}>
                    <Button variant={'link'} className='text-xs sm:text-sm'>
                      Shopping Cart
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-4 pl-4'>
              <p className='text-lg font-medium text-muted-foreground'>Categories</p>
              <ul className='grid sm:grid-cols-2 max-w-xs lg:gap-x-8 border-l'>
                {categories.map(category => (
                  <li key={category}>
                    <Link href={`/products?category=${category}`}>
                      <Button variant={'link'} className='text-xs sm:text-sm'>
                        {capitalizeString(category)}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className='space-y-2 col-[1]'>
          <div className='lg:w-1/2'>
            <h3 className='text-xl font-bold mb-2'>Contact Us</h3>
            <Separator />
          </div>
          <p className='text-sm text-muted-foreground pt-2'>
            40 Labor St, El Shaykh Zayed, GZ 1234, EG
          </p>
        </section>

        <p className='flex items-center gap-1 text-xs mt-8 lg:mt-16 text-muted-foreground font-semibold col-[1]'>
          Copyright <Copyright size={14} /> 2024 - <strong>TechBots</strong>
        </p>
      </div>
    </footer>
  );
}
