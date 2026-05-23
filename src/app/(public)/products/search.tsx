"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Data } from "@/app/lib/products";
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

type SearchResultGroups = Record<string, Data[]>;

export function SearchProducts() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultGroups>({});
  const shortcutLabel = useMemo(() => {
    if (typeof navigator === "undefined") return "⌘/";

    return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘/" : "Ctrl+/";
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) &&
        (event.key === "/" || event.key === "?");

      if (!isShortcut) return;

      event.preventDefault();
      setOpen((pv) => !pv);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults({});
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/products/search?query=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results.");
        }

        const data: SearchResultGroups = await response.json();

        if (!controller.signal.aborted) {
          setResults(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setResults({});
        }
      }
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          title="search"
          variant={"ghost"}
          className="group z-10 size-auto rounded-full border px-1.5 py-1 max-xl:hover:bg-input xl:hover:bg-transparent"
        >
          <Search
            strokeWidth={2.5}
            className="size-6 p-1 text-muted-foreground"
          />
          <span className="text-xs text-muted-foreground">Search</span>
          <kbd className="ml-4 hidden min-w-8 justify-center rounded-full border bg-input p-1 text-xs font-bold text-muted-foreground sm:inline-flex">
            {shortcutLabel}
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[380px] p-4">
        <DialogTitle className="sr-only">Search Products</DialogTitle>
        <Command loop shouldFilter={false}>
          <CommandInput
            placeholder="Type something to search..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {!query.trim() ? (
              <p className="px-2 py-8 text-center text-sm font-semibold text-muted-foreground">
                Start typing to load search results.
              </p>
            ) : Object.keys(results).length > 0 ? (
              Object.keys(results).map((category) => (
                <CommandGroup
                  key={category}
                  className="[&_[cmdk-group-heading]]:px-0"
                  heading={
                    <h3 className="text-xs font-medium text-muted-foreground">
                      {capitalizeString(category)}
                    </h3>
                  }
                >
                  <SearchItems items={results[category]} />
                </CommandGroup>
              ))
            ) : (
              <CommandEmpty className="py-8 text-center text-sm font-semibold text-muted-foreground">
                No results found.
              </CommandEmpty>
            )}
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
