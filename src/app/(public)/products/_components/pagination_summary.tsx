import { cn } from "@/lib/utils";
import prisma from "@/app/lib/db";

import { getFilters } from "../grid";
import { SearchParams } from "@/app/lib/types";
import { extractSearchParams } from "@/app/lib/utils";

type PaginationSummaryProps = {
  className?: string;
  searchParams: SearchParams;
};

export async function PaginationSummary({
  className,
  searchParams,
}: PaginationSummaryProps) {
  const filters = getFilters(searchParams);
  const { page } = extractSearchParams(searchParams);
  const totalCount = await prisma.product.count({ where: filters });

  const limit = 8;
  const start = (+page <= 0 ? 0 : +page - 1) * limit;
  const end = start + limit;
  const totalPages = Math.ceil(totalCount / limit);

  if (totalCount === 0) return null;
  if (+page > totalPages || +page < 0) {
    return (
      <p className={cn("text-xs font-medium text-muted-foreground", className)}>
        <span className="font-semibold">0</span> -{" "}
        <span className="font-semibold">0</span> of{" "}
        <span className="font-semibold">0</span> results
      </p>
    );
  }

  return (
    <p className={cn("text-xs font-medium text-muted-foreground", className)}>
      <span className="font-semibold">{start + 1}</span> -{" "}
      <span className="font-semibold">
        {end > totalCount ? totalCount : end}
      </span>{" "}
      of <span className="font-semibold">{totalCount}</span> results
    </p>
  );
}
