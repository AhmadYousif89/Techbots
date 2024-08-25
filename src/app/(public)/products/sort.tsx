"use client";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectSeparator,
} from "@/components/ui/select";
import { SearchParams, SortValue } from "@/app/lib/types";
import { extractSearchParams } from "@/app/lib/utils";
import { LoaderButton } from "./_components/skeletons/loader_btn";

const sortList = [
  { value: "popular", label: "Most popular" },
  { value: "newest", label: "Newest" },
  { value: "lowest-price", label: "Lowest Price" },
  { value: "highest-price", label: "Highest Price" },
];

export function SortProducts({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();
  const sp = extractSearchParams(searchParams);
  const [isPending, startTransition] = useTransition();
  const [optimisticSort, setOptimisticSort] = useOptimistic(sp.sort);

  const params: Record<string, string> = {
    ...(sp.page && { page: sp.page }),
    ...(sp.category && { cat: sp.category }),
    ...(sp.brand && { brand: sp.brand }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
    ...(sp.grid && { grid: sp.grid }),
  };

  const handleOnChange = (value: SortValue) => {
    value !== "reset" ? (params.sort = value) : undefined;

    const newParams = new URLSearchParams(params);
    startTransition(() => {
      setOptimisticSort(value);
      router.push(`/products?${newParams.toString()}`);
    });
  };

  return (
    <Select name="sort" value={optimisticSort} onValueChange={handleOnChange}>
      {isPending && optimisticSort === "reset" ? (
        <LoaderButton />
      ) : (
        <SelectTrigger
          // data-pending={isPending ? '' : undefined}
          className={`w-28 gap-1 rounded border-0 px-1 pl-2 text-xs font-medium hover:bg-muted hover:ring-1 hover:ring-input`}
        >
          <SelectValue placeholder="Sort By">
            {optimisticSort
              ? sortList.find(({ value }) => value === optimisticSort)?.label
              : "Sort By"}
          </SelectValue>
        </SelectTrigger>
      )}
      <SelectContent className="group">
        {sortList.map(({ value, label }) => (
          <SelectItem
            key={value}
            value={value}
            className="p-2 text-xs font-medium text-muted-foreground"
          >
            {label}
          </SelectItem>
        ))}
        {optimisticSort && (
          <>
            <SelectSeparator />
            <SelectItem
              disabled={!optimisticSort}
              className="p-2 text-xs font-medium text-muted-foreground"
              value="reset"
            >
              Clear
            </SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
}
