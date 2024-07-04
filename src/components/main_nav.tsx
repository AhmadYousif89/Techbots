import Link from 'next/link';
import { Button } from './ui/button';

export function MainNav() {
  return (
    <nav className='hidden lg:flex items-center'>
      <ul className='flex items-center space-x-6'>
        <li>
          <Link href='/'>
            <Button variant={'link'} className='text-secondary'>
              Home
            </Button>
          </Link>
        </li>
        <li>
          <Link href='/products'>
            <Button variant={'link'} className='text-secondary'>
              Products
            </Button>
          </Link>
        </li>
        <li>
          <Link href='/#blogs'>
            <Button variant={'link'} className='text-secondary'>
              Blogs
            </Button>
          </Link>
        </li>
        <li>
          <Link href='/#footer'>
            <Button variant={'link'} className='text-secondary'>
              About
            </Button>
          </Link>
        </li>
        <li>
          <Link href='/#footer'>
            <Button variant={'link'} className='text-secondary'>
              Contact
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
