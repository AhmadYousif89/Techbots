"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Logo } from "./logo";
import { AuthButtons } from "./auth_buttons";
import { categories } from "@/app/lib/types";
import { useSideMenuState } from "@/app/lib/store";
import { capitalizeString } from "@/app/lib/utils";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SideMenu() {
  const { isOpen, setIsOpen } = useSideMenuState();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size={"sm"}
          className="size-7 bg-primary p-1 ring-2 ring-input transition-all hover:bg-secondary hover:ring-primary *:hover:stroke-primary lg:hidden"
        >
          <svg
            className="size-[20px] stroke-background"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"} className="flex flex-col">
        <SheetHeader className="flex-row items-center justify-between pt-4">
          <SheetTitle>
            <Logo className="font-medium text-primary" />
          </SheetTitle>

          <UserButton
            userProfileMode="navigation"
            userProfileUrl="/user"
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userPreviewMainIdentifier: "capitalize font-bold",
                userPreviewSecondaryIdentifier: "font-medium",
                userButtonPopoverMain: { pointerEvents: "auto" },
              },
            }}
          />
        </SheetHeader>
        <Separator />

        <ul className="grid gap-4 pb-4 text-sm">
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              href="/products"
              className="inline-block w-full border-b-[1px] border-transparent pb-1 hover:border-b-foreground/15 hover:text-foreground/70"
            >
              Shop
            </Link>
          </li>
          <li>
            <Accordion type="single" collapsible>
              <AccordionItem value="coupon">
                <AccordionTrigger className="py-0 pb-4 text-xs uppercase hover:text-foreground/70">
                  Categories
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid grid-cols-2 gap-x-4 py-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          onClick={() => setIsOpen(false)}
                          href={`/products?cat=${category}`}
                          className="inline-block border-b-[1px] border-transparent p-1 text-xs hover:border-b-foreground/15 hover:text-foreground/70"
                        >
                          {capitalizeString(category)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              className="inline-block w-full border-b-[1px] border-transparent pb-1 hover:border-b-foreground/15 hover:text-foreground/70"
              href="/cart"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              className="inline-block w-full border-b-[1px] border-transparent pb-1 hover:border-b-foreground/15 hover:text-foreground/70"
              href="/#blogs"
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              className="inline-block w-full border-b-[1px] border-transparent pb-1 hover:border-b-foreground/15 hover:text-foreground/70"
              href="/#footer"
            >
              About
            </Link>
          </li>
        </ul>

        <Separator />

        <AuthButtons />

        <Separator />

        <SheetFooter className="mt-auto sm:flex-col">
          <SheetClose asChild className="my-4">
            <Button variant={"outline"}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
