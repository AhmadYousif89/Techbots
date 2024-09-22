"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";

import { LoadingButton } from "../skeletons/loading_btn";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MIN_PRICE = 10;
const MAX_PRICE = 5000;

export function FilterContentPrice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isReset, resetTransition] = useTransition();
  const [isPending, applyTransition] = useTransition();

  const initialMin = Number(searchParams.get("min")) || MIN_PRICE;
  const initialMax = Number(searchParams.get("max")) || MAX_PRICE;

  const [priceRange, setPriceRange] = useState<number[]>([
    initialMin,
    initialMax,
  ]);

  const handlePriceChange = useCallback((value: number[]) => {
    if (value.length !== 2) return;
    setPriceRange(value);
  }, []);

  const handleReset = useCallback(() => {
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    const params = new URLSearchParams(searchParams);
    params.delete("min");
    params.delete("max");
    resetTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }, [router, searchParams]);

  const handleApply = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("min", priceRange[0].toString());
    params.set("max", priceRange[1].toString());
    applyTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }, [router, searchParams, priceRange]);

  const isFilterApplied = initialMin > MIN_PRICE || initialMax < MAX_PRICE;

  return (
    <div className="grid w-full max-w-sm gap-4 self-start">
      <div className="flex items-center justify-between gap-4 px-2">
        <h3 className="font-medium text-muted-foreground">Price</h3>
        {isFilterApplied && (
          <LoadingButton isLoading={isReset} className="bg-transparent">
            <Button
              type="button"
              variant="link"
              onClick={handleReset}
              className="h-auto gap-1 p-0 text-xs font-medium text-muted-foreground hover:text-destructive"
            >
              <ChevronLeft className="size-3" /> Reset
            </Button>
          </LoadingButton>
        )}
      </div>

      <div className="px-2">
        <Slider
          step={10}
          min={MIN_PRICE}
          max={MAX_PRICE}
          className="my-4"
          value={priceRange}
          onValueChange={handlePriceChange}
          minStepsBetweenThumbs={50}
          addRightThumb
        />
      </div>

      <div className="flex justify-between">
        <Badge variant="secondary" className="text-muted-foreground">
          ${priceRange[0]}
        </Badge>
        <Badge variant="secondary" className="text-muted-foreground">
          ${priceRange[1]}
        </Badge>
      </div>

      {isFilterApplied && (
        <small className="font-medium text-muted-foreground">
          Showing items between{" "}
          <span className="font-semibold">
            ${initialMin.toFixed(2)} and ${initialMax.toFixed(2)}
          </span>
        </small>
      )}

      <LoadingButton isLoading={isPending} className="[width:min(10rem,65%)]">
        <Button
          size="sm"
          onClick={handleApply}
          disabled={
            isPending ||
            (priceRange[0] === initialMin && priceRange[1] === initialMax)
          }
          className="w-full text-xs transition-transform duration-200 active:translate-y-1"
        >
          Apply
        </Button>
      </LoadingButton>
    </div>
  );
}
