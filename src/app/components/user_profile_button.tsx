"use client";

import { DotIcon, LogIn, ShoppingBag, User } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserProfileButton() {
  const { userId } = useAuth();

  let location = { pathname: "" };
  if (typeof window !== "undefined")
    location = { pathname: window.location.pathname };

  if (userId) {
    return (
      <div className="hidden size-7 place-content-center rounded-full bg-muted-foreground ring-1 ring-input ring-offset-1 lg:grid">
        <UserButton
          userProfileMode="modal"
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userPreviewMainIdentifier: "capitalize font-bold",
              userPreviewSecondaryIdentifier: "font-medium",
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              href="/cart"
              label="Manage Cart"
              labelIcon={<ShoppingBag className="size-4" />}
            />
            <UserButton.Link
              href="/orders"
              label="Order History"
              labelIcon={<LogsIcon />}
            />
          </UserButton.MenuItems>
        </UserButton>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hidden lg:flex">
        <div className="grid size-7 cursor-pointer place-content-center rounded-full bg-primary p-1 text-secondary ring-1 ring-input hover:bg-secondary hover:text-primary hover:ring-0">
          <User className="size-fit" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuRadioGroup>
          <DropdownMenuItem className="h-9 p-0 hover:bg-muted">
            <SignInButton fallbackRedirectUrl={location.pathname} mode="modal">
              <span className="flex size-full cursor-pointer items-center gap-2 px-2">
                <LogIn className="size-4" />
                Login
              </span>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-9 p-0 hover:bg-muted">
            <SignUpButton fallbackRedirectUrl={location.pathname} mode="modal">
              <span className="flex size-full cursor-pointer items-center gap-2 px-2">
                <User className="size-4" />
                Sign Up
              </span>
            </SignUpButton>
          </DropdownMenuItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const LogsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16px"
    viewBox="0 -960 960 960"
    width="16px"
    fill="currentColor"
  >
    <path d="M480-400 40-640l440-240 440 240-440 240Zm0 160L63-467l84-46 333 182 333-182 84 46-417 227Zm0 160L63-307l84-46 333 182 333-182 84 46L480-80Zm0-411 273-149-273-149-273 149 273 149Zm0-149Z" />
  </svg>
);
