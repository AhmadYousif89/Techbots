"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Image } from "@unpic/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Data } from "@/app/lib/products";
import { capitalizeString } from "@/app/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";

type SearchResultGroups = Record<string, Data[]>;

const searchResultsCache = new Map<string, SearchResultGroups>();

export function SearchProducts() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultGroups>({});
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const shortcutLabel = useMemo(() => {
    if (typeof navigator === "undefined") return "⌘/";
    return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘/" : "Ctrl+/";
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isShortcut =
        (e.metaKey || e.ctrlKey) && (e.key === "/" || e.key === "?");

      if (!isShortcut) return;

      e.preventDefault();
      setOpen((pv) => !pv);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();
    const cacheKey = trimmedQuery.toLowerCase();

    if (!trimmedQuery) {
      setResults({});
      setIsLoading(false);
      return;
    }

    if (searchResultsCache.has(cacheKey)) {
      setResults(searchResultsCache.get(cacheKey) ?? {});
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/products/search?query=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );

        if (!response.ok) throw new Error("Failed to fetch search results.");

        const data: SearchResultGroups = await response.json();

        if (!controller.signal.aborted) {
          searchResultsCache.set(cacheKey, data);
          setResults(data);
          setIsLoading(false);
        }
      } catch {
        if (!controller.signal.aborted) {
          searchResultsCache.set(cacheKey, {});
          setResults({});
          setIsLoading(false);
        }
      }
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const frameId = window.requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: 0, behavior: "auto" });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [open, query, results, isLoading]);

  const hasResults = Object.keys(results).length > 0;

  return (
    <>
      <Button
        title="search"
        variant="ghost"
        onClick={() => setOpen(true)}
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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search Products</DialogTitle>
        <Command loop shouldFilter={false} className="min-h-[380px] p-4">
          <CommandInput
            placeholder="Type something to search..."
            value={query}
            onValueChange={setQuery}
          />
          {!isLoading && !hasResults && query.trim() !== "" && (
            <CommandEmpty className="py-8 text-center text-sm font-semibold text-muted-foreground">
              No results found.
            </CommandEmpty>
          )}
          <CommandList ref={listRef}>
            {isLoading ? (
              <SearchResultsSkeleton />
            ) : !query.trim() ? (
              <p className="px-2 py-8 text-center text-sm font-semibold text-muted-foreground">
                Start typing to load search results.
              </p>
            ) : (
              hasResults &&
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
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

function SearchItems({ items }: { items: Data[] }) {
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

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6 px-2 py-4">
      {[...Array(2)].map((_, groupIndex) => (
        <div key={groupIndex} className="space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-input" />

          <div className="space-y-2">
            {[...Array(4)].map((_, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2">
                <div className="size-10 shrink-0 animate-pulse rounded-md bg-input" />
                <div className="h-10 w-full animate-pulse rounded-md bg-input" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
