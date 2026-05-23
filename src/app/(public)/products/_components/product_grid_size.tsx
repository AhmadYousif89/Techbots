"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Grid2x2 } from "@/icons/grid2x2";
import { Grid3x3 } from "@/icons/grid3x3";
import { Grid4x4 } from "@/icons/grid4x4";
import { Button } from "@/components/ui/button";
import { extractSearchParams } from "@/app/lib/utils";

export function ProductGridSize() {
  const router = useRouter();
  const params = useSearchParams();
  const sp = extractSearchParams(params.entries());
  const [optimisticGrid, setOptimisticGrid] = useOptimistic(sp.grid);
  const [isPending, startTransition] = useTransition();

  const newParams = new URLSearchParams(
    Object.entries(sp).filter(([k, v]) => (v ? v && k !== "grid" : v)),
  );
  const ps = newParams.toString() ? newParams.toString() : "";

  const handleGridChange = (value: string) => {
    if (optimisticGrid === value) {
      router.push(`/products?${ps}`);
      return;
    }

    startTransition(() => {
      setOptimisticGrid(value);
      router.push(`/products?${ps}${ps ? "&" : ""}grid=${value}`);
    });
  };

  return (
    <div className="col-span-full mr-4 hidden items-center gap-1 lg:flex">
      <Button
        variant="ghost"
        size="icon"
        data-active={optimisticGrid === "2"}
        className='size-7 rounded-md ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input'
        onClick={() => handleGridChange("2")}
      >
        <RenderLoader isLoading={isPending && optimisticGrid === "2"}>
          <Grid2x2 />
        </RenderLoader>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        data-active={optimisticGrid === "3"}
        className='size-7 rounded-md ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input'
        onClick={() => handleGridChange("3")}
      >
        <RenderLoader isLoading={isPending && optimisticGrid === "3"}>
          <Grid3x3 />
        </RenderLoader>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        data-active={optimisticGrid === "4"}
        className='size-7 rounded-md ring-1 ring-transparent hover:bg-transparent data-[active="true"]:ring-input'
        onClick={() => handleGridChange("4")}
      >
        <RenderLoader isLoading={isPending && optimisticGrid === "4"}>
          <Grid4x4 />
        </RenderLoader>
      </Button>
    </div>
  );
}

type RenderLoaderProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

function RenderLoader({ isLoading, children }: RenderLoaderProps) {
  return isLoading ? (
    <Loader2 className="size-5 animate-spin text-foreground" />
  ) : (
    children
  );
}
