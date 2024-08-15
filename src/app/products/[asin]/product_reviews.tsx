import Link from "next/link";

import { TProduct } from "../_lib/types";
import { extractSearchParams } from "../_lib/utils";
import { RatingBreakdown, SearchParams } from "../_lib/types";

import { getProductDetails } from "./product_details";
import { AddReview } from "../_components/reviews/add_review";
import { ReviewItem } from "../_components/reviews/review_item";
import { RatingStars } from "../_components/reviews/rating_stars";
import { PaginationButtons } from "../_components/pagination_button";
import { ReviewsRatingBars } from "../_components/reviews/rating_bars";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductReviewsProps = {
  asin: string;
  searchParams: SearchParams;
};

export async function ProductReviews({
  asin,
  searchParams,
}: ProductReviewsProps) {
  const limit = 5;
  const { page, selectedRating } = extractSearchParams(searchParams);
  const { product, reviewsCount } = await getProductDetails(
    asin,
    searchParams,
    limit,
  );

  const reviews = product?.topReviews;

  if (reviewsCount === 0 && !selectedRating) {
    return (
      <Card className="mx-6 max-w-screen-sm">
        <CardHeader>
          <CardTitle className="w-fit text-lg">
            No reviews for this product!
          </CardTitle>
          <CardDescription className="ml-4 py-4">
            Be the first to review this product and help others make a better
            decision.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AddReview />
        </CardFooter>
      </Card>
    );
  }

  let content;
  if (selectedRating && reviewsCount === 0) {
    content = (
      <CardTitle className="text-lg text-muted-foreground">
        No reviews for this rating!
      </CardTitle>
    );
  }

  const totalPages = Math.ceil(reviewsCount / limit);
  const start = (+page <= 0 ? 0 : +page - 1) * limit;
  const end = start + limit;
  const hasNextPage = end < reviewsCount;
  const hasPrevPage = start > 0;

  let headDesciption = "Top Reviews";
  for (let i = 0; i < 5; i++) {
    if (selectedRating === `${5 - i}`) {
      headDesciption = `${5 - i} Star Reviews`;
      break;
    }
  }

  if (reviewsCount) {
    content = (
      <div className="group">
        <div className="flex items-center justify-between pb-8">
          <h3 className="text-lg font-medium">{headDesciption}</h3>
          <ReviewsPaginationButtons
            asin={asin}
            searchParams={searchParams}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            totalPages={totalPages}
          />
        </div>
        <div className="space-y-4 divide-y-[1px]">
          {reviews.map((review) => (
            <ReviewItem key={review.id} {...review} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <CardContent>
      <section className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        <RatingOverview searchParams={searchParams} product={product} />
        <Card className="flex flex-1 flex-col justify-between p-6 lg:basis-full">
          <>{content}</>
          <CardFooter className="p-6 px-0">
            <AddReview />
          </CardFooter>
        </Card>
      </section>
    </CardContent>
  );
}

type PaginationSectionProps = {
  asin: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  searchParams: SearchParams;
};

export function ReviewsPaginationButtons({
  asin,
  hasPrevPage,
  hasNextPage,
  totalPages,
  searchParams,
}: PaginationSectionProps) {
  const { page, selectedRating, category } = extractSearchParams(searchParams);
  const params = new URLSearchParams({
    ...(category && { cat: category }),
    ...(selectedRating && { sr: selectedRating }),
  });

  const resetUrl = `/products/${asin}?page=1#reviews`;

  return (
    <div className="grid items-center gap-y-2">
      {selectedRating && (
        <Button
          size="sm"
          variant="outline"
          className="place-self-center"
          disabled={!selectedRating}
        >
          <Link href={resetUrl}>Reset</Link>
        </Button>
      )}

      <PaginationButtons
        asin={asin}
        page={page}
        params={params.toString()}
        baseUrl={`/products/${asin}/`}
        totalPages={totalPages}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}

type RatingOverviewProps = {
  product: Pick<
    TProduct,
    "asin" | "rating" | "ratingsTotal" | "ratingBreakdown"
  >;
  searchParams: SearchParams;
};

function RatingOverview({ product, searchParams }: RatingOverviewProps) {
  const { asin, rating, ratingsTotal } = product;
  const ratingBreakdown = product.ratingBreakdown as RatingBreakdown;

  return (
    <div className="grid flex-1 gap-4 lg:basis-1/2 lg:self-start">
      <Card className="grid aspect-square max-w-32 items-center justify-center p-2 shadow-sm">
        <h3 className="grid aspect-square size-12 items-center justify-center place-self-center rounded-full p-2 text-2xl font-semibold text-muted-foreground shadow-sm ring-1 ring-zinc-300">
          {rating}
        </h3>
        <RatingStars
          size={"sm"}
          className="justify-center"
          productRating={rating}
          reviewsCount={ratingsTotal}
          showTotalReviews={false}
        />
        <p className="text-center text-xs font-medium text-muted-foreground">
          {ratingsTotal.toLocaleString()} rating
        </p>
      </Card>
      <ReviewsRatingBars
        asin={asin}
        searchParams={searchParams}
        ratingsTotal={ratingsTotal}
        ratingBreakdown={ratingBreakdown}
      />
    </div>
  );
}
