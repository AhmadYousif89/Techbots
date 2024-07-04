import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { User } from 'lucide-react';

import { Logo } from './logo';
import { SideMenu } from './side_menu';
import { CartMenu } from './cart/cart_menu';
import { MainNav } from './main_nav';
import { WishListMenu } from './wishlist/wishlist_menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function Header() {
  return (
    <header className='sticky top-0 z-20 h-20 px-8 bg-foreground/85 backdrop-blur-sm'>
      <div className='flex items-center justify-between max-w-screen-xl h-full mx-auto'>
        <SideMenu />
        <Logo />
        <MainNav />
        <div className='flex items-center gap-4 lg:gap-8'>
          <WishListMenu />
          <CartMenu />
          <SignedIn>
            <div className='ring-1 ring-input rounded-full ring-offset-1 size-7 grid place-content-center bg-muted-foreground'>
              <UserButton afterSignOutUrl='/'></UserButton>
            </div>
          </SignedIn>
          <SignedOut>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='ring-1 ring-input rounded-full ring-offset-1 size-7 grid place-content-center cursor-pointer text-secondary'>
                  <User className='size-6' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='min-w-44'>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <Separator />
                <DropdownMenuRadioGroup className='*:p-4 divide-y'>
                  <DropdownMenuRadioItem
                    value='signin'
                    className='hover:bg-muted *:text-xs *:font-medium'>
                    <SignInButton mode='modal'>Login</SignInButton>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value='signup'
                    className='hover:bg-muted *:text-xs *:font-medium'>
                    <SignUpButton mode='modal' />
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
