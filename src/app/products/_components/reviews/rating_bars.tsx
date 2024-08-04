import Link from "next/link";
import { extractSearchParams } from "../../_lib/utils";
import { RatingBreakdown, RatingDetails, SearchParams } from "../../_lib/types";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type ReviewsRatingBarsProps = {
  asin: string;
  ratingsTotal: number;
  ratingBreakdown: RatingBreakdown;
  searchParams: SearchParams;
};

export function ReviewsRatingBars({
  asin,
  ratingsTotal,
  ratingBreakdown,
  searchParams,
}: ReviewsRatingBarsProps) {
  const { selectedRating } = extractSearchParams(searchParams);
  const keys: Array<keyof RatingBreakdown> = [
    "five_star",
    "four_star",
    "three_star",
    "two_star",
    "one_star",
  ];

  return (
    <Card className="w-full max-w-sm space-y-2 px-2 py-4 shadow-sm">
      {keys.map((rate, index) => {
        const starIndex = 5 - index;
        const ratingDetail = ratingBreakdown[
          rate as keyof RatingBreakdown
        ] as RatingDetails;
        const ratingCount = ratingDetail.count;
        const ratingPercentage = ratingDetail.percentage;

        return (
          <TooltipProvider key={starIndex}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/products/${asin}?page=1&limit=5&sr=${starIndex}#reviews`}
                >
                  <Button
                    variant={+selectedRating == starIndex ? "outline" : "ghost"}
                    className="grid h-8 w-full grid-cols-[auto,1fr,auto] items-center gap-2 py-0"
                  >
                    <p className="flex items-center">
                      <span className="mr-1 text-sm font-semibold text-muted-foreground">
                        {starIndex}
                      </span>
                      <span className="text-xl text-yellow-500">★</span>
                    </p>
                    <Progress
                      value={ratingPercentage}
                      className="h-2 [&>*]:bg-yellow-500"
                    />
                    <p className="cursor-default text-center text-sm font-medium text-muted-foreground">
                      {ratingPercentage}%
                    </p>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  <span className="font-bold">{ratingCount} </span>
                  <span>review{ratingCount !== 1 ? "s" : ""} represents </span>
                  <span className="font-bold">{ratingPercentage}% </span>of the
                  total
                  <span className="font-bold"> {ratingsTotal} </span>
                  reviews of the <span className="font-bold">{starIndex} </span>
                  star rating.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </Card>
  );
}
