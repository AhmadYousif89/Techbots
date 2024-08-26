import { Filter } from "lucide-react";
import { SearchParams } from "@/app/lib/types";
import { extractSearchParams } from "@/app/lib/utils";
import { getBrandList } from "@/app/lib/products";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { FilterContentBrands } from "./_components/filters/filter_content_brand";
import { FilterContentPrice } from "./_components/filters/filter_content_price";

type FilterProductsProps = {
  searchParams: SearchParams;
  open?: string;
};

export function FilterProducts({ searchParams, open }: FilterProductsProps) {
  const { category } = extractSearchParams(searchParams);
  const brands = getBrandList(category);

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={open}
      className="min-w-[300px] flex-grow"
    >
      <AccordionItem
        value="filter"
        className='group/item data-[state="closed"]:border-b-0 xl:border-b-0'
      >
        <AccordionTrigger className="group/btn flex-grow-0 py-6 pl-4 md:pl-10 xl:pl-4 [&>svg]:hidden">
          <div className="flex items-center gap-2 text-xs hover:border-transparent">
            <Filter
              className={`size-4 group-hover/btn:fill-muted-foreground group-has-[[data-state="open"]]/item:fill-muted-foreground`}
            />
            <span>Filters</span>
          </div>
        </AccordionTrigger>
        <Separator className="xl:hidden" />
        <AccordionContent className="p-6 xl:pr-0">
          <div className="grid gap-y-8 md:grid-cols-[60%,40%] xl:max-w-xs xl:grid-cols-1">
            <div className="space-y-8">
              <FilterContentBrands data={brands} />
              <Separator className="md:hidden" />
            </div>
            <section className="md:flex md:flex-row-reverse md:gap-8 xl:flex-col-reverse">
              <FilterContentPrice />
              <Separator className="hidden md:block md:h-auto md:w-px xl:h-px xl:w-full" />
            </section>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
