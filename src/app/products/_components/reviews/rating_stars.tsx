"use client";

import Link from "next/link";
import { cn } from "@/app/lib/utils";

type RatingStarsProps = {
  className?: string;
  productRating: number;
  reviewsCount?: string | number;
  showTotalReviews?: boolean;
  size?: "xs" | "sm" | "xl";
};

export function RatingStars({
  className,
  size = "xl",
  productRating,
  reviewsCount = "0",
  showTotalReviews = true,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-8", className)}>
      <div
        className={cn(
          "relative",
          'before:text-3xl before:text-muted-foreground before:content-["★★★★★"]',
          size === "xl" && "before:text-2xl",
          size === "sm" && "before:text-lg",
          size === "xs" && "before:text-sm",
        )}
      >
        <div
          className={cn(
            "absolute left-0 top-0 overflow-hidden",
            'before:text-3xl before:text-yellow-500 before:content-["★★★★★"]',
            size === "xl" && "before:text-2xl",
            size === "sm" && "before:text-lg",
            size === "xs" && "before:text-sm",
          )}
          style={{ width: (productRating / 5) * 100 + "%" }}
        ></div>
      </div>
      {showTotalReviews && (
        <Link
          href="#reviews"
          className="text-sm font-medium text-muted-foreground hover:underline"
        >
          Reviews: {reviewsCount}
        </Link>
      )}
    </div>
  );
}
