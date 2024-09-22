"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { use, useRef, useTransition, useOptimistic } from "react";

import { cn } from "@/lib/utils";
import { capitalizeString, extractSearchParams } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOnClickOutside } from "./hooks/use_onClick_outside";

type Props = {
  data: Promise<string[]>;
};

export function CategoryNavMenu({ data }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const sp = extractSearchParams(params.entries());
  const [_, startTransition] = useTransition();
  const [optCategory, setOptCategory] = useOptimistic(sp.category);

  const newParams = new URLSearchParams(
    Object.entries(sp).filter(([k, v]) => (v ? v && k !== "category" : v)),
  );
  const ps = newParams.toString() ? `&${newParams.toString()}` : "";
  const end = 14;
  const categories = use(data);
  const cats = categories.slice(0, end);
  const url = (cat: string) => `/products?cat=${cat}${ps}`;

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    const trigger = ref.current?.querySelector(
      '[aria-expanded="true"]',
    ) as HTMLButtonElement;
    trigger?.click();
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      if (category === optCategory) {
        setOptCategory("");
        router.push("/products");
        return;
      }
      setOptCategory(category);
      router.push(url(category));
    });
  };

  const renderCategoryList = (categories: string[]) => (
    <>
      {categories.map((category) => (
        <Button
          key={category}
          variant="link"
          onClick={() => handleCategoryChange(category)}
          aria-selected={category === optCategory}
          className="px-0 text-xs text-secondary aria-selected:text-blue-400 aria-selected:underline"
        >
          <span>{capitalizeString(category)}</span>
        </Button>
      ))}
    </>
  );

  return (
    <Accordion type="single" collapsible>
      <AccordionItem ref={ref} value="cats-1" className="group border-b-0">
        <AccordionTrigger className="gap-1 text-xs text-secondary underline-offset-4">
          Categories
        </AccordionTrigger>
        <Card
          className={cn(
            "absolute left-1/2 top-full -translate-x-1/2",
            "w-full bg-primary/85 backdrop-blur-sm",
            'max-view rounded-none border-0 group-data-[state="open"]:border-t',
          )}
        >
          <AccordionContent className="max-view mx-auto grid p-2">
            <div className="flex items-center justify-evenly">
              {renderCategoryList(cats)}
            </div>
            {categories.length > end && (
              <Accordion type="single" collapsible>
                <AccordionItem value="cats-2" className="border-b-0">
                  <AccordionContent>
                    <div className="flex flex-wrap items-center justify-center gap-x-12">
                      {renderCategoryList(categories.slice(end))}
                    </div>
                  </AccordionContent>
                  <AccordionTrigger className="justify-center gap-1 p-0 pb-2 text-xs text-secondary underline-offset-4" />
                </AccordionItem>
              </Accordion>
            )}
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
