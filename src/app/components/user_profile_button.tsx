"use client";

import { Menu, User } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        <div className="grid size-7 cursor-pointer place-content-center rounded-full bg-primary text-secondary ring-1 ring-input ring-offset-1 hover:bg-secondary hover:text-primary">
          <User className="size-6" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <Separator />
        <DropdownMenuRadioGroup className="divide-y *:p-4">
          <DropdownMenuItem className="*:text-xs *:font-medium hover:bg-muted">
            <SignInButton fallbackRedirectUrl={location.pathname} mode="modal">
              Login
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuItem className="*:text-xs *:font-medium hover:bg-muted">
            <SignUpButton
              fallbackRedirectUrl={location.pathname}
              mode="modal"
            />
          </DropdownMenuItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
