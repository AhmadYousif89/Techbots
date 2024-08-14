"use client";

import { Review } from "@prisma/client";

import { RatingStars } from "./rating_stars";
import { CircleUserRound, Loader } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { ReviewDate, ReviewProfile } from "@/app/products/_lib/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CardContent, CardHeader } from "@/components/ui/card";

export function ReviewItem(review: Review) {
  let reviewer;
  let time = "a few moments ago";
  if (review.profile && typeof review.profile === "object") {
    const profile = review.profile as ReviewProfile;
    reviewer = profile?.name?.split(" ").slice(0, 2).join(" ") ?? "Anonymous";
  }
  if (review.date && typeof review.date === "object") {
    const date = review.date as ReviewDate;
    time = date.utc;
  }

  const body = review.body.split("Read")[0];

  return (
    <article className="rounded-lg bg-accent/25 p-2 group-has-[[data-pending]]:animate-pulse group-has-[[data-pending]]:bg-accent">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <CardHeader className="flex-row gap-4 p-0">
            <CircleUserRound strokeWidth={1} size={36} className="my-auto" />
            <div>
              <h4 className="text-sm font-medium">{reviewer}</h4>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                {new Date(time).toLocaleString()}
              </p>
              <RatingStars
                size="sm"
                productRating={review.rating}
                showTotalReviews={false}
              />
            </div>
          </CardHeader>
          <Loader className="mr-4 hidden size-6 text-muted-foreground group-has-[[data-pending]]:block group-has-[[data-pending]]:animate-[spin_3s_linear_infinite]" />
        </div>
        <CardContent
          className={`overflow-hidden text-ellipsis p-0 pl-4 text-xs text-muted-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box] sm:text-sm`}
        >
          {body}
        </CardContent>
      </div>
      <Dialog modal={false}>
        <DialogTrigger className="peer ml-4 mt-1 h-auto p-0 text-xs text-primary hover:bg-transparent hover:text-muted-foreground">
          Read more
        </DialogTrigger>
        <div
          className={cn(
            "fixed inset-0 hidden bg-primary/50",
            "peer-aria-expanded:block",
          )}
        />
        <DialogContent className="max-h-[600px] max-w-screen-md overflow-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <CardHeader className="flex-row gap-4 p-0">
                <CircleUserRound
                  strokeWidth={1}
                  size={36}
                  className="my-auto"
                />
                <div>
                  <h4 className="text-sm font-medium">{reviewer}</h4>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {new Date(time).toLocaleString()}
                  </p>
                  <RatingStars
                    size="sm"
                    productRating={review.rating}
                    showTotalReviews={false}
                  />
                </div>
              </CardHeader>
              <Loader className="mr-4 hidden size-6 text-muted-foreground group-has-[[data-pending]]:block group-has-[[data-pending]]:animate-[spin_3s_linear_infinite]" />
            </div>
            <CardContent
              className={`overflow-hidden text-ellipsis p-0 pl-4 text-xs text-muted-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:0] [display:-webkit-box] sm:text-sm`}
            >
              {body}
            </CardContent>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
