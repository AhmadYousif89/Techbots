import { User } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Logo } from "./logo";
import { MainNav } from "./main_nav";
import { SideMenu } from "./side_menu";
import { CartMenu } from "./cart_menu/cart_menu";
import { WishListMenu } from "./wishlist_menu/wishlist_menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

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
          <CartMenu />
          {userId ? (
            <div className="hidden size-7 place-content-center rounded-full bg-muted-foreground ring-1 ring-input ring-offset-1 lg:grid">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userPreviewMainIdentifier: "capitalize font-bold",
                    userPreviewSecondaryIdentifier: "font-medium",
                  },
                }}
              />
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden lg:flex">
                <div className="grid size-7 cursor-pointer place-content-center rounded-full bg-primary text-secondary ring-1 ring-input ring-offset-1 hover:bg-secondary hover:text-primary">
                  <User className="size-6" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-44">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <Separator />
                <DropdownMenuRadioGroup className="divide-y *:p-4">
                  <DropdownMenuItem className="*:text-xs *:font-medium hover:bg-muted">
                    <SignInButton mode="modal">Login</SignInButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="*:text-xs *:font-medium hover:bg-muted">
                    <SignUpButton mode="modal" />
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
