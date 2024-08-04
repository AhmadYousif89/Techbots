"use client";

import { use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn, capitalizeString } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { extractSearchParams } from "@/app/products/_lib/utils";

type Props = {
  data: Promise<string[] | undefined>;
};

export function CategoryNavMenu({ data }: Props) {
  let categories = use(data) ?? [];
  categories = categories.filter((cat) => !cat.startsWith("smart"));
  const params = useSearchParams();
  const sp = extractSearchParams(params.entries());
  const newParams = new URLSearchParams({
    ...(sp.page && { page: sp.page }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
    ...(sp.grid && { grid: sp.grid }),
  });
  const ps = newParams.toString() ? `&${newParams.toString()}` : "";
  const end = 14;
  const cats = categories.length > end ? categories.slice(0, end) : categories;
  const url = (cat: string) => `/products/?cat=${cat}${ps}`;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="cats-1" className="group border-b-0">
        <AccordionTrigger className="gap-1 text-xs text-secondary underline-offset-4">
          Categories
        </AccordionTrigger>
        <Card
          className={cn(
            "absolute left-1/2 top-[100%] -translate-x-1/2",
            "w-full bg-primary/85 backdrop-blur-sm",
            'max-view rounded-none border-0 group-data-[state="open"]:border-t',
          )}
        >
          <AccordionContent className="max-view mx-auto grid p-2">
            <div className="flex items-center justify-evenly">
              {cats.map((category) => (
                <Button
                  asChild
                  key={category}
                  variant={"link"}
                  aria-selected={category === params.get("cat")}
                  className="px-0 text-xs text-secondary aria-selected:text-blue-400 aria-selected:underline"
                >
                  <Link href={url(category)}>{capitalizeString(category)}</Link>
                </Button>
              ))}
            </div>
            {categories.length > end && (
              <Accordion type="single" collapsible>
                <AccordionItem value="cats-2" className="border-b-0">
                  <AccordionContent>
                    <div className="flex flex-wrap items-center justify-center gap-x-12">
                      {categories.slice(end).map((category) => (
                        <Button
                          asChild
                          key={category}
                          variant={"link"}
                          className="px-0 text-xs text-secondary"
                        >
                          <Link href={url(category)}>
                            {capitalizeString(category)}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                  <AccordionTrigger className="justify-center gap-1 p-0 pb-2 text-xs text-secondary underline-offset-4"></AccordionTrigger>
                </AccordionItem>
              </Accordion>
            )}
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
