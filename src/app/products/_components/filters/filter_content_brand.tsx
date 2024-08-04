"use client";
import { ChevronLeft, Loader2 } from "lucide-react";
import { use, useOptimistic, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractSearchParams } from "../../_lib/utils";
import { capitalizeString } from "@/app/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";

export function FilterContentBrands({ data }: { data: Promise<string[]> }) {
  const brands = use(data);
  const router = useRouter();
  const params = useSearchParams();
  const [showMore, setShowMore] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const sp = extractSearchParams(params.entries());
  const brandParams = sp.brand ? sp.brand.split(",") : [];
  const [optimisticBrands, useOptimisticBrands] = useOptimistic(brandParams);
  const [isPending, startTransition] = useTransition();

  const newParams = new URLSearchParams({
    ...(sp.page && { page: sp.page }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
    ...(sp.grid && { grid: sp.grid }),
  });

  const url = () => `/products/?${newParams.toString()}`;

  const hasFilterBrand = optimisticBrands.length > 0;
  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const end = 30;
  const list = filteredBrands.slice(0, end);

  const onBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    startTransition(() => {
      const updatedBrands = optimisticBrands.includes(name)
        ? optimisticBrands.filter((brand) => brand !== name)
        : [...optimisticBrands, name];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useOptimisticBrands(updatedBrands);
      router.push(
        url() +
          (updatedBrands.length > 0 ? `&brand=${updatedBrands.join(",")}` : ""),
      );
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
          checked={optimisticBrands.includes(brand)}
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

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="flex items-center gap-2 font-medium text-muted-foreground">
            Brands
          </h3>
          <Label htmlFor="brand-search" className="p-0 xl:max-w-28">
            <Input
              type="search"
              id="brand-search"
              placeholder="Filter..."
              className="h-7 py-0 sm:placeholder:text-xs"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Label>
        </div>
        {hasFilterBrand && (
          <div className="flex gap-2">
            <HoverCard openDelay={300}>
              <HoverCardTrigger className="cursor-pointer">
                <small className="inline-grid aspect-square size-5 place-content-center rounded-full font-semibold text-primary shadow ring-1 ring-input hover:underline">
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  ) : (
                    optimisticBrands.length
                  )}
                </small>
              </HoverCardTrigger>
              <HoverCardContent className="min-w-72">
                <h4 className="text-xs font-bold text-muted-foreground">
                  Selected Brands:
                </h4>
                <Separator className="my-2" />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-2">
                  {optimisticBrands.map((brand, index) => (
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
              onClick={() => router.push(url())}
              className="h-auto gap-1 p-0 text-xs font-medium text-muted-foreground hover:text-destructive md:pr-4"
            >
              <ChevronLeft className="size-3" /> Clear
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,auto))] gap-2 space-y-1 pl-4 xl:grid-cols-[minmax(120px,auto),auto] xl:gap-x-0">
        {filteredBrands.length > 0 ? (
          <>
            {list.map(renderBrandItem)}
            {filteredBrands.length > end && (
              <Accordion type="single" collapsible className="col-span-full">
                <AccordionItem value="cats-2" className="border-b-0">
                  <AccordionContent>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,auto))] gap-2 space-y-1 xl:grid-cols-[1fr,.95fr] xl:gap-x-0">
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
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            No brands match your search.
          </p>
        )}
      </div>
    </>
  );
}
