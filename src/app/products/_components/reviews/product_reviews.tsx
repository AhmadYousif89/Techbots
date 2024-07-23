import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { TProduct } from '../../_lib/types';
import { extractSearchParams } from '../../_lib/utils';
import { RatingBreakdown, SearchParams } from '../../_lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddReview } from './add_review';
import { ReviewItem } from './review_item';
import { RatingStars } from './rating_stars';
import { ReviewsRatingBars } from './rating_bars';
import { PaginationButton } from '../pagination_button';
import { getProductDetails } from '../../[asin]/product_view';

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
  const { page, limit, selectedRating, category } = extractSearchParams(
    searchParams,
    '5'
  );
  const params = new URLSearchParams({
    ...(limit && { limit }),
    ...(category && { cat: category }),
    ...(selectedRating && { sr: selectedRating }),
  });

  let reviewsTitle = 'Top Reviews';
  for (let i = 0; i < 5; i++) {
    if (selectedRating === `${5 - i}`) {
      reviewsTitle = `${5 - i} Star Reviews`;
      break;
    }
  }

  const resetUrl = `/products/${asin}?page=1&limit=${limit}&cat=${category}#reviews`;
  const nextPageUrl = `/products/${asin}?page=${+page + 1}&${params.toString()}#reviews`;
  const prevPageUrl = `/products/${asin}?page=${+page - 1}&${params.toString()}#reviews`;

  return (
    <div className='flex justify-between items-center'>
      <h3 className='font-medium text-xl mb-auto'>{reviewsTitle}</h3>
      <div className='grid items-center gap-y-2'>
        <Button
          size='sm'
          variant='outline'
          className='place-self-center'
          disabled={!selectedRating}>
          <Link href={resetUrl}>View All</Link>
        </Button>

        <div className='flex items-center gap-4'>
          <PaginationButton
            className='size-7 p-1'
            elementId='reviews'
            disabled={!hasPrevPage}
            href={prevPageUrl}>
            <ChevronLeft />
          </PaginationButton>
          <span className='text-muted-foreground font-medium text-sm'>
            {+page === 0 ? 1 : +page > totalPages ? 0 : +page} / {totalPages}
          </span>
          <PaginationButton
            className='size-7 p-1'
            elementId='reviews'
            disabled={!hasNextPage}
            href={nextPageUrl}>
            <ChevronRight />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

type RatingOverviewProps = {
  product: Pick<TProduct, 'asin' | 'rating' | 'ratingsTotal' | 'ratingBreakdown'>;
  searchParams: SearchParams;
};

function RatingOverview({ product, searchParams }: RatingOverviewProps) {
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
        searchParams={searchParams}
        ratingsTotal={ratingsTotal}
        ratingBreakdown={ratingBreakdown}
      />
    </div>
  );
}

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

  const start = (+page <= 0 ? 0 : +page - 1) * +limit;
  const totalPages = Math.ceil(reviewsCount / +limit);
  const hasNextPage = start + +limit < reviewsCount;
  const hasPrevPage = start > 0;

  if (reviews.length > 0) {
    content = (
      <div className='space-y-8'>
        <ReviewsPaginationButtons
          asin={asin}
          searchParams={searchParams}
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
        <RatingOverview searchParams={searchParams} product={product} />
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
