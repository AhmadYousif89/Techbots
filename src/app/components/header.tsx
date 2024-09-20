import { auth } from "@clerk/nextjs/server";
import { getServerCart } from "@/app/(protected)/cart/page";

import { Logo } from "./logo";
import { MainNav } from "./main_nav";
import { SideMenu } from "./side_menu";
import { CartMenu } from "./cart/cart_menu";
import { WishListMenu } from "./wishlist/wishlist_menu";
import { UserProfileButton } from "./user_profile_button";
import { getCategories } from "../lib/products";

export function Header() {
  const { userId } = auth();
  const categories = getCategories();

  return (
    <header className="sticky top-0 z-20 h-20 bg-foreground/85 px-8 backdrop-blur-sm">
      <div className="max-view mx-auto flex h-full items-center justify-between">
        <SideMenu categoryList={categories} />
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
