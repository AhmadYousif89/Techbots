"use client";

import { useRef } from "react";
import { Review } from "@prisma/client";
import { CircleUserRound, Loader } from "lucide-react";

import { RatingStars } from "./rating_stars";
import { ReviewDate, ReviewProfile } from "@/app/lib/types";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useClampCheck } from "@/app/components/hooks/use-clamp-check";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ReviewItem(review: Review) {
  let reviewer;
  let time = "a few moments ago";

  if (review.profile) {
    const profile = review.profile as ReviewProfile;
    reviewer = profile?.name?.split(" ").slice(0, 2).join(" ") ?? "Anonymous";
  }
  if (review.date) {
    const date = review.date as ReviewDate;
    time = date.utc;
  }

  const bodyText = review.body.split("Read")[0];
  const bodyHtmlText =
    review.bodyHtml.split("Read")[0] + "<span className='mb-8'/>";

  const bodyTextRef = useRef(null);
  const { isClamped } = useClampCheck(bodyTextRef, bodyText);

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
          ref={bodyTextRef}
          className={`line-clamp-3 overflow-hidden p-0 text-xs text-muted-foreground sm:pl-4 sm:text-sm`}
        >
          {bodyText}
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
                dangerouslySetInnerHTML={{ __html: bodyHtmlText }}
                className={`p-0 pl-4 text-sm text-muted-foreground [&_.reviewText]:pb-8`}
              >
                {/* {bodyText} */}
              </CardContent>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </article>
  );
}
