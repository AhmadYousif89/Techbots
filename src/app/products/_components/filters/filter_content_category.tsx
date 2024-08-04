"use client";
import { use } from "react";
import { ChevronLeft } from "lucide-react";
import { capitalizeString } from "@/app/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFilter } from "../../_store/filters";

export function FilterContentCategory({ data }: { data: Promise<string[]> }) {
  const categories = use(data);
  const { selectedCategory, setCategory, clearSelectedCategory } = useFilter(
    (s) => s.category,
  );

  const hasFilterCategory = selectedCategory.length > 0;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-muted-foreground">Category</h3>
        {hasFilterCategory && (
          <Button
            variant={"link"}
            onClick={() => clearSelectedCategory()}
            className="h-auto gap-1 py-0 text-xs font-medium text-muted-foreground hover:text-destructive"
          >
            <ChevronLeft className="size-3" /> Clear
          </Button>
        )}
      </div>
      <div className="grid grid-cols-[repeat(2,minmax(auto,1fr))] gap-y-2 space-y-1 px-2 md:gap-x-8">
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <Input
              id={category}
              name={category}
              type="checkbox"
              className="h-4 w-4 cursor-pointer"
              checked={selectedCategory.includes(category)}
              onChange={(e) => setCategory(e.target.name)}
            />
            <Label
              htmlFor={category}
              className="cursor-pointer text-xs hover:text-muted-foreground"
            >
              {capitalizeString(category)}
            </Label>
          </div>
        ))}
      </div>
    </section>
  );
}
