"use client";

import { cn } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type PaginationButtonProps = {
  className?: string;
  asin?: string;
  page: string;
  params: string;
  baseUrl: string;
  totalPages: number;
  totalCount?: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

export const PaginationButtons = (props: PaginationButtonProps) => {
  const { asin, params, page, totalPages, baseUrl } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticPage, setOptimisticPage] = useOptimistic(page || "1");

  const startingPage = +page <= 0 ? 1 : +page <= totalPages ? +page : 0;
  const endingPage = totalPages >= 1 ? totalPages : 0;

  const path = asin ? `/${asin}` : "";
  const ps = params ? `&${params}` : "";
  const firstPageUrl = `/products${path}?page=1${ps}${asin ? "#reviews" : ""}`;
  const nextPageUrl = `/products${path}?page=${+page == 0 ? 2 : +page + 1}${ps}${asin ? "#reviews" : ""}`;
  const prevPageUrl = `/products${path}?page=${+page - 1}${ps}${asin ? "#reviews" : ""}`;
  const lastPageUrl = `/products${path}?page=${totalPages}${ps}${asin ? "#reviews" : ""}`;

  const handleOnChange = (p: string) => {
    startTransition(() => {
      setOptimisticPage(p);
      if (baseUrl.endsWith("products/"))
        router.push(`${baseUrl}?page=${p}${ps}`);
      else router.push(`${baseUrl}?page=${p}${ps}#reviews`);
    });
  };

  const handleOnClick = (p: number, url: string) => {
    startTransition(() => {
      setOptimisticPage(p.toString());
      router.push(url);
    });
  };

  return (
    <div
      data-pending={isPending ? "" : undefined}
      className={cn("flex items-center gap-2 *:flex-1", props.className)}
    >
      {totalPages > 2 && (
        <Button
          variant={"outline"}
          className="size-6 p-0 disabled:opacity-25"
          onClick={() => handleOnClick(startingPage, firstPageUrl)}
          disabled={!props.hasPrevPage}
        >
          <ChevronsLeft className="size-4" />
        </Button>
      )}
      <Button
        variant={"outline"}
        className="size-6 p-0 disabled:opacity-25"
        onClick={() => handleOnClick(+page - 1, prevPageUrl)}
        disabled={!props.hasPrevPage}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Select
        name="pagination"
        value={optimisticPage}
        onValueChange={handleOnChange}
      >
        <SelectTrigger showIcon={false} className="h-7 p-0 text-xs">
          <SelectValue asChild>
            <div className="flex h-full w-full items-center justify-center gap-1 px-2">
              {isPending ? (
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              ) : (
                <span>{optimisticPage}</span>
              )}
              <span>-</span>
              <span>{endingPage}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <SelectItem
              key={page}
              value={page.toString()}
              className="select-item my-1 select-none p-2 text-xs font-semibold text-muted-foreground"
            >
              {page}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* <Button
        asChild
        variant={'outline'}
        className='h-7 p-0 text-muted-foreground font-medium'>
        <div className='relative grid grid-cols-[20px,10px,20px] place-items-center w-16 text-xs'>
          <span
            className={`col-span-full row-span-full justify-self-start ${
              !isPending ? 'pl-2' : ''
            }`}>
            {content}
          </span>
          <span className='col-[2] row-span-full'>of</span>
          <span className='col-[3] row-span-full'>{endingPage}</span>
        </div>
      </Button> */}
      <Button
        variant={"outline"}
        className="size-6 p-0 disabled:opacity-25"
        onClick={() => handleOnClick(+page + 1, nextPageUrl)}
        disabled={!props.hasNextPage}
      >
        <ChevronRight className="size-4" />
      </Button>
      {totalPages > 2 && (
        <Button
          variant={"outline"}
          className="size-6 p-0 disabled:opacity-25"
          onClick={() => handleOnClick(endingPage, lastPageUrl)}
          disabled={!props.hasNextPage}
        >
          <ChevronsRight className="size-4" />
        </Button>
      )}
    </div>
  );
};
