"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractSearchParams } from "@/app/lib/utils";
import { Loader2 } from "lucide-react";

import { Grid2x2 } from "@/icons/grid2x2";
import { Grid3x3 } from "@/icons/grid3x3";
import { Grid4x4 } from "@/icons/grid4x4";
import { Button } from "@/components/ui/button";

export function ProductGridSize() {
  const router = useRouter();
  const params = useSearchParams();
  const sp = extractSearchParams(params.entries());
  const [optimisticGrid, setOptimisticGrid] = useOptimistic(sp.grid);
  const [isPending, startTransition] = useTransition();

  const newParams = new URLSearchParams({
    ...(sp.page && { page: sp.page }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
  });
  const ps = newParams.toString();

  const handleGridChange = (value: string) => {
    startTransition(() => {
      if (optimisticGrid === value) {
        router.push(`/products?${ps}`);
        return;
      }
      setOptimisticGrid(value);
      router.push(`/products?${ps && ps + "&"}grid=${value}`);
    });
  };

  return (
    <div className="col-span-full hidden items-center gap-1 lg:flex">
      <Button
        variant="ghost"
        data-active={optimisticGrid === "2"}
        className='rounded-none p-2 ring-1 ring-transparent hover:bg-transparent data-[active="true"]:shadow data-[active="true"]:ring-input'
        onClick={() => handleGridChange("2")}
      >
        <Grid2x2 />
      </Button>
      <Button
        variant="ghost"
        data-active={optimisticGrid === "3"}
        className='rounded-none p-2 ring-1 ring-transparent hover:bg-transparent data-[active="true"]:shadow data-[active="true"]:ring-input'
        onClick={() => handleGridChange("3")}
      >
        <Grid3x3 />
      </Button>
      <Button
        variant="ghost"
        data-active={optimisticGrid === "4"}
        className='rounded-none p-2 ring-1 ring-transparent hover:bg-transparent data-[active="true"]:shadow data-[active="true"]:ring-input'
        onClick={() => handleGridChange("4")}
      >
        <Grid4x4 />
      </Button>

      {isPending && (
        <div className="ml-4 p-1">
          <Loader2 className="size-5 animate-[spin_1s_linear_infinite]" />
        </div>
      )}
    </div>
  );
}
