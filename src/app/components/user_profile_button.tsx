"use client";

import { LogIn, User } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";

export function UserProfileButton() {
  const { userId } = useAuth();

  let location = { pathname: "" };
  if (typeof window !== "undefined")
    location = { pathname: window.location.pathname };

  if (userId) {
    return (
      <div className="hidden size-7 place-content-center rounded-full bg-muted-foreground ring-1 ring-input ring-offset-1 lg:grid">
        <UserButton
          userProfileMode="navigation"
          userProfileUrl="/user"
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userPreviewMainIdentifier: "capitalize font-bold",
              userPreviewSecondaryIdentifier: "font-medium",
            },
          }}
        />
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
