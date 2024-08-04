import { Review } from "@prisma/client";
import { RatingStars } from "./rating_stars";
import { CircleUserRound, Loader } from "lucide-react";
import { ReviewDate, ReviewProfile } from "@/app/products/_lib/types";
import { CardContent, CardHeader } from "@/components/ui/card";

export async function ReviewItem(review: Review) {
  let reviewer;
  let time = "a few moments ago";
  if (review.profile && typeof review.profile === "object") {
    const profile = review.profile as ReviewProfile;
    reviewer = profile.name ?? "Anonymous";
  }
  if (review.date && typeof review.date === "object") {
    const date = review.date as ReviewDate;
    time = date.utc;
  }

  return (
    <article className="space-y-2 rounded-lg bg-accent/25 p-2 group-has-[[data-pending]]:animate-pulse group-has-[[data-pending]]:bg-accent">
      <div className="flex items-center justify-between">
        <CardHeader className="flex-row gap-4 p-0">
          <CircleUserRound strokeWidth={1} size={40} className="my-auto" />
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
      <CardContent className="text-muted-foreground">
        {review.body.split("Read")[0]}
      </CardContent>
    </article>
  );
}
