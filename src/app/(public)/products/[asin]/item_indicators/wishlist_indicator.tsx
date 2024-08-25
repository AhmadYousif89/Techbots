"use client";

import { HeartIcon } from "lucide-react";
import { useWishlistStore } from "@/app/(public)/products/_store/wishlist";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function WishlistIndicator({ asin }: { asin: string }) {
  const { wishlist } = useWishlistStore();

  const item = wishlist.find((item) => item.asin === asin);

  if (item) {
    return (
      <Popover modal>
        <PopoverTrigger>
          <HeartIcon className="size-5 fill-destructive stroke-none" />
        </PopoverTrigger>
        <PopoverContent className="w-fit text-xs text-muted-foreground">
          This item was added to your wishlist
        </PopoverContent>
      </Popover>
    );
  }
}
