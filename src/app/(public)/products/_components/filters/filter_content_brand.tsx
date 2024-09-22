"use client";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useOptimistic, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { extractSearchParams, capitalizeString } from "@/app/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function FilterContentBrands({ data }: { data: Promise<string[]> }) {
  const brands = use(data);
  const router = useRouter();
  const params = useSearchParams();
  const sp = extractSearchParams(params.entries());

  const [showMore, setShowMore] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const brandParams = sp.brand ? sp.brand.split(",") : [];
  const [optBrands, setOptBrands] = useOptimistic(brandParams);
  const [isPending, startTransition] = useTransition();

  const newParams = new URLSearchParams(
    Object.entries(sp).filter(([k, v]) => (v ? v && k !== "brand" : v)),
  );
  const ps = newParams.toString() ? `&${newParams.toString()}` : "";
  const url = `/products/?${ps}`;

  const hasFilterBrand = optBrands.length > 0;
  const filteredBrands = brands.filter((brand) =>
    brand
      .toLowerCase()
      .replace(/[-_]/g, "")
      .includes(searchValue.toLowerCase().replace(/[-_]/g, "")),
  );
  const end = 30;
  const list = filteredBrands.slice(0, end);

  const onBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const updatedBrands = optBrands.includes(name)
      ? optBrands.filter((brand) => brand !== name)
      : [...optBrands, name];
    setOptBrands(updatedBrands);

    startTransition(() => {
      router.push(url + `&brand=${updatedBrands.join(",")}`);
    });
  };

  const onBrandReset = () => {
    setOptBrands([]);
    startTransition(() => {
      router.push(url);
    });
  };

  const renderBrandItem = (brand: string, index: number) => {
    const key = `${brand}-${index}`;
    return (
      <div key={key} className="flex items-center gap-2">
        <Input
          id={key}
          name={brand}
          type="checkbox"
          className="h-4 w-4 cursor-pointer"
          checked={optBrands.includes(brand)}
          onChange={onBrandChange}
        />
        <Label
          htmlFor={key}
          className="cursor-pointer text-xs hover:text-muted-foreground"
        >
          {brand.startsWith("Philips")
            ? "Philips"
            : capitalizeString(brand, false)}
        </Label>
      </div>
    );
  };

  const noResultMsg = (
    <p className="col-span-full text-center text-xs text-muted-foreground">
      Your search did not match any brands.
    </p>
  );

  return (
    <>
      <section className="flex max-w-screen-md flex-col justify-between gap-4 pr-8 xl:pr-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 font-medium text-muted-foreground">
            Brands
          </h3>
          {hasFilterBrand && (
            <div className="flex gap-2">
              <HoverCard openDelay={300}>
                <HoverCardTrigger className="cursor-pointer">
                  <small className="inline-grid aspect-square size-5 place-content-center rounded-full font-semibold text-primary shadow ring-1 ring-input hover:underline">
                    {isPending ? (
                      <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    ) : (
                      optBrands.length
                    )}
                  </small>
                </HoverCardTrigger>
                <HoverCardContent className="min-w-72">
                  <h4 className="text-xs font-bold text-muted-foreground">
                    Selected Brands:
                  </h4>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-2">
                    {optBrands.map((brand, index) => (
                      <p
                        key={index}
                        className="text-xs font-medium text-muted-foreground"
                      >
                        #{" "}
                        {brand.startsWith("Philips")
                          ? "Philips"
                          : capitalizeString(brand, false)}
                      </p>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Button
                variant={"link"}
                onClick={onBrandReset}
                className="h-auto gap-1 p-0 text-xs font-medium text-muted-foreground hover:text-destructive md:pr-4"
              >
                <ChevronLeft className="size-3" /> Clear
              </Button>
            </div>
          )}
        </div>

        <Label htmlFor="brand-search" className="w-full pr-4">
          <Input
            type="search"
            id="brand-search"
            placeholder="Filter by brand..."
            className="h-7 py-0 focus-visible:rounded sm:placeholder:text-xs"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </Label>
      </section>

      {filteredBrands.length > 0 ? (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(120px,auto))] gap-2 space-y-1 pl-4 xl:grid-cols-2 xl:gap-x-0">
          {list.map(renderBrandItem)}
          {filteredBrands.length > end && (
            <Accordion type="single" collapsible className="col-span-full">
              <AccordionItem value="cats-2" className="border-b-0">
                <AccordionContent>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,auto))] gap-2 space-y-1 xl:grid-cols-2 xl:gap-x-0">
                    {filteredBrands.slice(end).map(renderBrandItem)}
                  </div>
                </AccordionContent>
                <AccordionTrigger
                  onClick={() => setShowMore(!showMore)}
                  className="justify-center gap-1 py-0 pt-4 text-xs text-muted-foreground underline-offset-4 hover:text-primary/50"
                >
                  {showMore ? "Show Less" : "Show More"}
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          )}
        </section>
      ) : (
        noResultMsg
      )}
    </>
  );
}
