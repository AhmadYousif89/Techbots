"use client";

import { useTransition, FormEventHandler, ChangeEventHandler } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractSearchParams } from "@/app/lib/utils";
import { useFilter } from "../../_store/filters";

import { ChevronLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function FilterContentPrice() {
  const router = useRouter();
  const params = useSearchParams();
  const sp = extractSearchParams(params.entries());
  const [isPending, startTransition] = useTransition();

  const { min, max, setMax, setMin, clearPrice } = useFilter((s) => s.price);

  const newParams = new URLSearchParams({
    ...(sp.page && { page: sp.page }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.grid && { grid: sp.grid }),
  });

  const { min: paramMin, max: paramMax } = sp;
  const minParam = min && `min=${min ? min : paramMin}`;
  const maxParam = max && `max=${max ? max : paramMax}`;
  const url = () => {
    return `/products?${newParams.toString()}${minParam ? `&${minParam}` : ""}${
      maxParam ? `&${maxParam}` : ""
    }`;
  };

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = parseFloat(e.target.value);
    setMin(isNaN(val) ? "" : val.toString());
  };

  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = parseFloat(e.target.value);
    setMax(isNaN(val) ? "" : val.toString());
  };

  const handleReset = () => {
    router.push(`/products?${newParams.toString()}`);
    clearPrice();
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    startTransition(() => {
      router.push(url());
    });
  };

  return (
    <form
      className="grid w-full max-w-sm gap-4 self-start"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-medium text-muted-foreground">Price</h3>
        {(paramMin || paramMax) && (
          <Button
            type="button"
            variant={"link"}
            onClick={handleReset}
            className="h-auto gap-1 py-0 text-xs font-medium text-muted-foreground hover:text-destructive"
          >
            <ChevronLeft className="size-3" /> Reset
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4 xl:max-w-52 xl:flex-col xl:items-stretch">
        <Label htmlFor="min" className="relative min-w-28 flex-1">
          <Input
            id="min"
            min={1}
            max={5000}
            type="number"
            placeholder="Min"
            className="placeholder:text-muted-foreground"
            onChange={handleMinChange}
            value={min}
          />
          {paramMin.trim() && !min && (
            <Badge
              variant={"secondary"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {paramMin}
            </Badge>
          )}
        </Label>
        <Label htmlFor="max" className="relative min-w-28 flex-1">
          <Input
            id="max"
            min={1}
            max={5000}
            type="number"
            placeholder="Max"
            className="placeholder:text-muted-foreground"
            onChange={handleMaxChange}
            value={max}
          />
          {paramMax.trim() && !max && (
            <Badge
              variant={"secondary"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {paramMax}
            </Badge>
          )}
        </Label>
      </div>
      <small className="font-medium text-muted-foreground">
        {/* trim is necessary for when manually changing the url values */}
        {paramMin.trim() && paramMax.trim() ? (
          <>
            Showing items between{" "}
            <span className="font-semibold">
              ${Number(paramMin).toFixed(2)} and ${Number(paramMax).toFixed(2)}
            </span>
          </>
        ) : paramMin.trim() ? (
          <>
            Showing items with minimum value of{" "}
            <span className="font-semibold">
              ${Number(paramMin).toFixed(2)}
            </span>
          </>
        ) : paramMax.trim() ? (
          <>
            Showing items with maximum value of{" "}
            <span className="font-semibold">
              ${Number(paramMax).toFixed(2)}
            </span>
          </>
        ) : null}
      </small>
      <Button
        size={"sm"}
        disabled={(+min < 1 && +max < 1) || isPending}
        className="min-w-20 justify-self-start text-xs transition-transform duration-200 active:translate-y-1"
      >
        {isPending ? <Loader2 className="size-5 animate-spin" /> : "Apply"}
      </Button>
    </form>
  );
}