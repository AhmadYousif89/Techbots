import { auth } from '@clerk/nextjs/server';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { User } from 'lucide-react';

import { Logo } from './logo';
import { MainNav } from './main_nav';
import { SideMenu } from './side_menu';
import { WishListMenu } from './wishlist/wishlist_menu';
import { CartMenu } from '../app/cart/_components/cart_menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Separator } from './ui/separator';

export function Header() {
  const { userId } = auth();

  return (
    <header className='sticky top-0 z-20 h-20 px-8 bg-foreground/85 backdrop-blur-sm'>
      <div className='flex items-center justify-between max-view h-full mx-auto'>
        <SideMenu />
        <Logo />
        <MainNav />
        <div className='flex items-center gap-4 lg:gap-8'>
          <WishListMenu />
          <CartMenu />
          {userId ? (
            <div className='hidden lg:grid place-content-center ring-1 ring-input rounded-full ring-offset-1 size-7 bg-muted-foreground'>
              <UserButton
                afterSignOutUrl='/'
                appearance={{
                  elements: {
                    userPreviewMainIdentifier: 'capitalize font-bold',
                    userPreviewSecondaryIdentifier: 'font-medium'
                  }
                }}
              />
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='hidden lg:flex'>
                <div className='ring-1 ring-input rounded-full ring-offset-1 size-7 grid place-content-center cursor-pointer text-secondary bg-primary hover:bg-secondary hover:text-primary'>
                  <User className='size-6' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='min-w-44'>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <Separator />
                <DropdownMenuRadioGroup className='*:p-4 divide-y'>
                  <DropdownMenuItem className='hover:bg-muted *:text-xs *:font-medium'>
                    <SignInButton mode='modal'>Login</SignInButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='hover:bg-muted *:text-xs *:font-medium'>
                    <SignUpButton mode='modal' />
                  </DropdownMenuItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
