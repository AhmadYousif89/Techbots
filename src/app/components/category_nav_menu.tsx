"use client";

import { use, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalizeString, extractSearchParams } from "@/app/lib/utils";
import { cn } from "@/lib/utils";

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
  data: Promise<string[] | undefined>;
};

export function CategoryNavMenu({ data }: Props) {
  let categories = use(data) ?? [];
  categories = categories.filter((cat) => !cat.startsWith("smart"));
  const router = useRouter();
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
  const url = (cat: string) => `/products?cat=${cat}${ps}`;

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    if (ref.current) {
      const trigger = ref.current.querySelector('[aria-expanded="true"]');
      if (trigger) (trigger as HTMLButtonElement).click();
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  const renderCategoryList = (categories: string[]) => (
    <>
      {categories.map((category) => (
        <Button
          key={category}
          variant={"link"}
          onClick={() => {
            if (category === sp.category) {
              router.push("/products");
            } else {
              router.push(url(category));
            }
          }}
          aria-selected={category === sp.category}
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
