import prisma from "@/app/lib/db";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Ban } from "lucide-react";
import { redirect } from "next/navigation";
import { extractSearchParams } from "@/app/lib/utils";
import { SearchParams, SortValue, TProduct } from "@/app/lib/types";

import { ProductGridSize } from "./_components/product_grid_size";
import { ProductGridItem } from "./_components/product_grid_item";
import { PaginationButtons } from "./_components/pagination_button";
import { GridItemSkeleton } from "./_components/skeletons/grid_item";

export async function ProductGrid({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters = getFilters(searchParams);
  const totalCount = await prisma.product.count({ where: filters });
  const sp = extractSearchParams(searchParams);

  const { page } = sp;
  const limitPerPage = 8;
  const totalPages = Math.ceil(totalCount / limitPerPage);
  const start =
    (+page <= 0 || +page > totalPages ? 0 : +page - 1) * limitPerPage;
  const end = start + limitPerPage;

  const hasNextPage = end < totalCount;
  const hasPrevPage = start > 0;

  const newParams = new URLSearchParams(
    Object.entries(sp).filter(([k, v]) => (v ? v && k !== "page" : v)),
  );

  const ps = newParams.toString() ? `&${newParams.toString()}` : "";

  return (
    <div id="products-grid" className="scroll-mt-10 lg:scroll-mt-24">
      <div className="flex h-16 items-center px-8">
        {totalCount > 0 && <ProductGridSize />}
        {totalPages > 0 && (
          <PaginationButtons
            className="ml-auto flex items-center justify-center gap-2"
            page={page}
            params={ps}
            baseUrl={"/products/"}
            totalCount={totalCount}
            totalPages={totalPages}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        )}
      </div>
      <section
        className={cn(
          "grid gap-x-8 gap-y-16 @container",
          "mx-auto w-full max-w-screen-lg px-4 py-8",
          "grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "xl:col-[2] xl:ml-auto xl:self-start xl:pl-0 xl:pr-8",
          sp.grid === "1" && "!grid-cols-1",
          sp.grid === "2" && "!grid-cols-2",
          sp.grid === "3" && "!grid-cols-3",
          sp.grid === "4" && "!grid-cols-4",
        )}
      >
        <Suspense
          key={JSON.stringify(sp)}
          fallback={<GridItemSkeleton grid={sp.grid} />}
        >
          <DisplayProductsGrid searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}

async function DisplayProductsGrid({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = await getProducts({ searchParams });

  if (products.length == 0) {
    return (
      <div className="relative col-span-full flex flex-col items-center gap-8">
        <p className="z-[1] text-center text-xl font-semibold tracking-wider text-muted-foreground sm:text-2xl lg:text-4xl">
          No Products Found!
        </p>
        <Ban className="size-36 stroke-[1] text-input sm:size-52 lg:size-72" />
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProductGridItem
          key={product.id}
          product={product}
          searchParams={searchParams}
        />
      ))}
    </>
  );
}

export function getFilters(searchParams: SearchParams) {
  const { category, brand, min, max } = extractSearchParams(searchParams);

  let filter: { [k: string]: any } = category ? { category } : {};
  if (brand && brand.includes(",")) {
    const list = brand.split(",").map((item) => item);
    filter = { ...filter, brand: { in: list } };
  } else if (brand) {
    filter = { ...filter, brand };
  }
  if (min || max) {
    filter = {
      ...filter,
      AND: [
        ...(min && !isNaN(+min) ? [{ price: { gte: +min } }] : []),
        ...(max && !isNaN(+max) ? [{ price: { lte: +max } }] : []),
      ],
    };
  }

  return filter;
}

export async function getProducts({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const limit = 8;
  const filter = getFilters(searchParams);
  const sp = extractSearchParams(searchParams);
  const { page, sort } = sp;
  const totalCount = await prisma.product.count({ where: filter });
  const totalPages = Math.ceil(totalCount / limit);
  const start = (+page <= 0 || +page > totalPages ? 0 : +page - 1) * limit;

  type SortOptions = Record<
    Exclude<SortValue, "">,
    Record<string, "asc" | "desc">
  >;
  const sortOptions: Omit<SortOptions, "reset"> = {
    popular: { rating: "desc" },
    newest: { createdAt: "desc" },
    "lowest-price": { price: "asc" },
    "highest-price": { price: "desc" },
  };

  const args: {
    where?: any;
    orderBy: Record<string, "asc" | "desc">;
    take: number;
    skip: number;
  } = {
    orderBy: sort
      ? sortOptions[sort as keyof typeof sortOptions]
      : { stockQuantity: "asc" },
    take: limit,
    skip: start,
  };

  if (Object.values(filter).length > 0) {
    args.where = filter;
  }

  let products: TProduct[] = [];
  try {
    products = (await prisma.product.findMany({
      ...args,
      include: { images: true },
    })) as TProduct[];
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Redirect to first page if is products and page is out of bounds
  if (totalCount > 0 && (+page > totalPages || +page < 0)) {
    console.log("Redirecting to first page");
    const newParams = new URLSearchParams(
      Object.entries(sp).filter(([k, v]) => v),
    );
    newParams.set("page", "1");
    console.log(newParams.toString());
    redirect(`/products/?${newParams.toString()}`);
  }

  return products;
}
