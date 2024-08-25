import { auth } from "@clerk/nextjs/server";

import { Logo } from "./logo";
import { MainNav } from "./main_nav";
import { SideMenu } from "./side_menu";
import { CartMenu } from "./cart_menu/cart_menu";
import { getServerCart } from "@/app/(protected)/cart/page";
import { UserProfileButton } from "./user_profile_button";
import { WishListMenu } from "./wishlist_menu/wishlist_menu";

export function Header() {
  const { userId } = auth();

  return (
    <header className="sticky top-0 z-20 h-20 bg-foreground/85 px-8 backdrop-blur-sm">
      <div className="max-view mx-auto flex h-full items-center justify-between">
        <SideMenu />
        <Logo />
        <MainNav />
        <div className="flex items-center gap-4 lg:gap-8">
          <WishListMenu />
          <CartMenu getServerCart={getServerCart(userId)} />
          <UserProfileButton />
        </div>
      </div>
    </header>
  );
}
