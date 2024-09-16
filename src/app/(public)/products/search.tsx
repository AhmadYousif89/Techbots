"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Data } from "@/app/lib/products";
import { capitalizeString } from "@/app/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type SearchProductProps = {
  data: Promise<Record<string, Data[]>>;
};

export function SearchProducts({ data }: SearchProductProps) {
  const itemsByCategory = use(data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="search"
          variant={"ghost"}
          className="group z-10 aspect-square size-auto rounded-full p-0 ring-2 ring-input max-xl:hover:bg-input xl:hover:bg-transparent"
        >
          <Search
            strokeWidth={2.5}
            className="size-6 p-1 text-muted-foreground"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <Command
          loop
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Type something to search..." />
          <CommandEmpty className="py-8 text-center text-sm font-semibold text-muted-foreground">
            No results found.
          </CommandEmpty>
          <CommandList>
            {Object.keys(itemsByCategory).map((category, i) => (
              <CommandGroup
                key={i + "-" + category}
                className="[&_[cmdk-group-heading]]:px-0"
                heading={
                  <h3 className="text-xs font-medium text-muted-foreground">
                    {capitalizeString(category)}
                  </h3>
                }
              >
                <SearchItems items={itemsByCategory[category]} />
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

type SearchResultsProps = {
  items: Data[];
};

function SearchItems({ items }: SearchResultsProps) {
  const router = useRouter();

  return (
    <>
      {items.map((item, i) => (
        <CommandItem
          key={i}
          className="my-2 cursor-pointer !p-0"
          onSelect={() => {
            router.push(`/products/${item.asin}`);
          }}
        >
          <Link
            href={`/products/${item.asin}`}
            className="flex items-center gap-4"
          >
            <Image
              src={item.mainImage}
              alt={item.title}
              width={50}
              height={50}
              className="size-10 object-contain"
            />
            <p
              className="line-clamp-1 pr-4 text-xs font-medium text-muted-foreground"
              title={item.title}
            >
              {item.title}
            </p>
          </Link>
        </CommandItem>
      ))}
    </>
  );
}
