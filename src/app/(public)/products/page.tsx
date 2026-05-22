import { Metadata } from "next";
import { Suspense } from "react";
import { SearchParams } from "@/app/lib/types";
import { getSearchItems } from "@/app/lib/products";
import { capitalizeString, extractSearchParams } from "@/app/lib/utils";

import { Separator } from "@/components/ui/separator";
import { PaginationSummary } from "./_components/pagination_summary";
import { BreadcrumbSection } from "./_components/product_breadcrumb";
import { ProductsViewSkeleton } from "./_components/skeletons/products_view";

import { ProductGrid } from "./grid";
import { SortProducts } from "./sort";
import { FilterProducts } from "./filter";
import { SearchProducts } from "./search";

export const generateMetadata = ({ searchParams }: PageProps): Metadata => {
  const category = capitalizeString(searchParams["cat"] ?? "", false);
  let brand = searchParams["brand"] ?? "";
  brand = brand.includes(",")
    ? brand
        .split(",")
        .map((b) => capitalizeString(b))
        .join(", ")
    : brand;
  const title = `Shop ${category ? "| " + category : ""}`;
  const description = `Find the best products online${
    category ? ` for ${category}${brand ? ` from ${brand}.` : "."}` : "."
  }`;

  return { title, description };
};

type PageProps = {
  params: Record<string, string>;
  searchParams: SearchParams;
};

export default function ProductsPage({ searchParams }: PageProps) {
  const { category, grid } = extractSearchParams(searchParams);
  const searchResults = getSearchItems();

  return (
    <Suspense fallback={<ProductsViewSkeleton grid={grid} />}>
      <main className="max-view mx-auto mb-0.5 min-h-svh w-full bg-background">
        <div className="flex h-14 items-center justify-between bg-muted px-4 md:px-10">
          <BreadcrumbSection category={category} />
          <div className="relative mx-auto flex items-center overflow-hidden rounded-full hover:bg-input">
            <SearchProducts data={searchResults} />
          </div>
          <PaginationSummary searchParams={searchParams} />
        </div>

        <Separator />
        {/* Filter Section On Small Screens */}
        <div className="relative xl:hidden">
          <FilterProducts searchParams={searchParams} />
          <div className="absolute right-0 top-3.5 flex items-center gap-4 pr-2 md:pr-8">
            <SearchProducts data={searchResults} />
            <SortProducts searchParams={searchParams} />
          </div>
        </div>
        {/* End Filter */}

        <div className="py-8 xl:grid xl:grid-cols-[minmax(20%,auto),1fr] xl:gap-8">
          {/* Filter Section On Desktop */}
          <div className="relative hidden justify-between self-start xl:flex">
            <FilterProducts searchParams={searchParams} open="filter" />
            <div className="absolute right-0 top-3 flex items-center gap-4">
              <SortProducts searchParams={searchParams} />
            </div>
          </div>
          {/* End Filter */}
          <ProductGrid searchParams={searchParams} />
        </div>
      </main>
    </Suspense>
  );
}
