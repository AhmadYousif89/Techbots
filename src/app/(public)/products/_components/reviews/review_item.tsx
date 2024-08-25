"use client";

import { Review } from "@prisma/client";

import { RatingStars } from "./rating_stars";
import { CircleUserRound, Loader } from "lucide-react";
import { ReviewDate, ReviewProfile } from "@/app/lib/types";

import { CardContent, CardHeader } from "@/components/ui/card";
import { useClampCheck } from "@/app/components/hooks/use-clamp-check";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
  const { isClamped, contentRef } = useClampCheck<HTMLDivElement>(body);

  return (
    <article className="bg-accent/25 p-2 group-has-[[data-pending]]:animate-pulse group-has-[[data-pending]]:bg-accent">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <CardHeader className="flex-row gap-4 p-0">
            <CircleUserRound strokeWidth={1} className="my-auto size-9" />
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
          ref={contentRef}
          className={`overflow-hidden text-ellipsis p-0 text-xs text-muted-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box] sm:pl-4 sm:text-sm`}
        >
          {body}
        </CardContent>
      </div>
      {isClamped && (
        <Dialog>
          <DialogTrigger
            className={`mt-1 h-auto select-none p-0 text-xs text-primary underline-offset-2 hover:bg-transparent hover:text-muted-foreground active:underline aria-expanded:underline sm:ml-4`}
          >
            Read more
          </DialogTrigger>
          <DialogContent className="max-h-[620px] min-w-72 max-w-screen-sm overflow-auto overscroll-contain lg:max-w-screen-md">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <CardHeader className="flex-row gap-4 p-0">
                  <CircleUserRound strokeWidth={1} className="my-auto size-9" />
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
                className={`overflow-auto text-ellipsis p-0 pl-4 text-sm text-muted-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:0] [display:-webkit-box] sm:text-sm`}
              >
                {body}
              </CardContent>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </article>
  );
}
