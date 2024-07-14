import { TProduct } from '../../_lib/types';
import { extractSearchParams } from '../../_lib/utils';
import { RatingBreakdown, SearchParams } from '../../_lib/types';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AddReview } from './add_review';
import { ReviewItem } from './review_item';
import { RatingStars } from './rating_stars';
import { ReviewsRatingBars } from './rating_bars';
import { ReviewsPaginationButtons } from './pagination_buttons';
import { getProductDetails } from '../../[asin]/product_view';

type ProductReviewsProps = {
  asin: string;
  searchParams: SearchParams;
};

export async function ProductReviews({ asin, searchParams }: ProductReviewsProps) {
  const { page, limit, selectedRating } = extractSearchParams(searchParams, '5');
  const { product, reviewsCount } = await getProductDetails(asin, searchParams);

  const reviews = product.topReviews;

  if (reviews.length === 0 && !selectedRating) {
    return (
      <Card className='max-w-screen-sm mx-6'>
        <CardHeader>
          <CardTitle className='text-lg w-fit'>No reviews for this product!</CardTitle>
          <CardDescription className='py-4 ml-4'>
            Be the first to review this product and help others make a better decision.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AddReview />
        </CardFooter>
      </Card>
    );
  }

  let content;
  if (selectedRating && reviews.length === 0) {
    content = (
      <CardTitle className='text-lg text-muted-foreground'>
        No reviews for this rating!
      </CardTitle>
    );
  }

  const start = (+page - 1) * +limit;
  const totalPages = Math.ceil(reviewsCount / +limit);
  const hasNextPage = start + +limit < reviewsCount;
  const hasPrevPage = start > 0;

  if (reviews.length > 0) {
    content = (
      <div className='space-y-8'>
        <ReviewsPaginationButtons
          asin={asin}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          totalPages={totalPages}
        />
        {reviews.map(review => (
          <ReviewItem key={review.id} {...review} />
        ))}
      </div>
    );
  }

  return (
    <CardContent>
      <section className='flex flex-col lg:flex-row lg:justify-between gap-8'>
        <RatingOverview product={product} />
        <Card className='p-6 flex-1 lg:basis-full flex flex-col justify-between'>
          <>{content}</>
          <CardFooter className='p-6 px-0'>
            <AddReview />
          </CardFooter>
        </Card>
      </section>
    </CardContent>
  );
}

type RatingOverviewProps = {
  product: Pick<TProduct, 'asin' | 'rating' | 'ratingsTotal' | 'ratingBreakdown'>;
};

function RatingOverview({ product }: RatingOverviewProps) {
  const { asin, rating, ratingsTotal } = product;
  const ratingBreakdown = product.ratingBreakdown as RatingBreakdown;

  return (
    <div className='grid gap-4 flex-1 lg:basis-1/2 lg:self-start'>
      <Card className='grid items-center justify-center max-w-32 aspect-square p-4 shadow-sm'>
        <h3 className='grid items-center justify-center place-self-center size-12 text-2xl font-semibold rounded-full ring-1 ring-zinc-300 shadow-sm aspect-square p-2 text-muted-foreground'>
          {rating}
        </h3>
        <RatingStars
          productRating={rating}
          reviewsCount={ratingsTotal}
          showTotalReviews={false}
          size={'sm'}
        />
        <p className='text-sm text-center text-muted-foreground font-medium'>
          {ratingsTotal.toLocaleString()} rating
        </p>
      </Card>
      <ReviewsRatingBars
        asin={asin}
        ratingsTotal={ratingsTotal}
        ratingBreakdown={ratingBreakdown}
      />
    </div>
  );
}
