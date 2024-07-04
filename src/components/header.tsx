import { Logo } from './logo';
import { SideMenu } from './side_menu';
import { CartMenu } from './cart/cart_menu';
import { MainNav } from './main_nav';
import { WishListMenu } from './wishlist/wishlist_menu';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';

export function Header() {
  const { userId } = auth();

  return (
    <header className='sticky top-0 z-20 h-20 px-8 bg-foreground/85 backdrop-blur-sm'>
      <div className='flex items-center justify-between max-w-screen-xl h-full mx-auto'>
        <SideMenu />
        <Logo />
        <MainNav />
        <div className='flex items-center gap-4 lg:gap-8'>
          <WishListMenu />
          <CartMenu />
          <div className='ring-1 ring-input rounded-full ring-offset-1 size-7 grid place-content-center bg-muted-foreground'>
            {userId && <UserButton />}
          </div>
        </div>
      </div>
    </header>
  );
}
