import { Metadata } from "next";
import { Suspense } from "react";
import { SearchParams } from "@/app/lib/types";
import { capitalizeString, extractSearchParams } from "@/app/lib/utils";

import { BreadcrumbSection } from "./_components/product_breadcrumb";
import { ProductsViewSkeleton } from "./_components/skeletons/products_view";

import { ProductGrid } from "./grid";
import { SortProducts } from "./sort";
import { FilterProducts } from "./filter";
import { SearchProducts } from "./search";
import { Main } from "@/components/main";

export const generateMetadata = ({ searchParams }: PageProps): Metadata => {
  const { category, brand } = extractSearchParams(searchParams);
  const categoryTitle = capitalizeString(category, false);
  const brandTitle = brand.includes(",")
    ? brand
        .split(",")
        .map((item) => capitalizeString(item))
        .join(", ")
    : brand;
  const title = `Shop ${categoryTitle ? "| " + categoryTitle : ""}`;
  const description = `Find the best products online${
    categoryTitle
      ? ` for ${categoryTitle}${brandTitle ? ` from ${brandTitle}.` : "."}`
      : "."
  }`;

  return { title, description };
};

type PageProps = {
  params: Record<string, string>;
  searchParams: SearchParams;
};

export default function ProductsPage({ searchParams }: PageProps) {
  const { category, grid } = extractSearchParams(searchParams);

  return (
    <Suspense fallback={<ProductsViewSkeleton grid={grid} />}>
      <Main className="mb-0.5">
        <div className="flex h-14 items-center justify-between bg-muted px-4 md:px-10">
          <BreadcrumbSection category={category} />
          <SearchProducts />
        </div>

        {/* Filter Section On Mobile */}
        <div className="relative xl:hidden">
          <FilterProducts searchParams={searchParams} />
          <div className="absolute right-0 top-3.5 flex items-center gap-4 pr-4 md:pr-8">
            <SortProducts searchParams={searchParams} />
          </div>
        </div>

        <div className="py-8 xl:grid xl:grid-cols-[minmax(20%,auto),1fr] xl:gap-8">
          {/* Filter Section On Desktop */}
          <div className="relative hidden justify-between self-start xl:flex">
            <FilterProducts searchParams={searchParams} open="filter" />
            <div className="absolute right-0 top-3 flex items-center gap-4">
              <SortProducts searchParams={searchParams} />
            </div>
          </div>

          <ProductGrid searchParams={searchParams} />
        </div>
      </Main>
    </Suspense>
  );
}
