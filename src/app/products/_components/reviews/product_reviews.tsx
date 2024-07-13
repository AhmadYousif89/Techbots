import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import { TProduct } from '@/app/products/_lib/types';
import { extractSearchParams } from '@/app/products/_lib/utils';
import { RatingBreakdown, SearchParams } from '@/app/products/_lib/types';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AddReview } from './add_review';
import { ReviewItem } from './review_item';
import { RatingStars } from './rating_stars';
import { ReviewsRatingBars } from './rating_bars';
import { ReviewsPaginationButtons } from './pagination_buttons';

type ProductReviewsProps = {
  asin: string;
  searchParams: SearchParams;
};

export async function ProductReviews({ asin, searchParams }: ProductReviewsProps) {
  const { page, limit, selectedRating } = extractSearchParams(searchParams, '5');
  const start = (+page - 1) * +limit;
  const end = start + +limit;

  const reviews = await prisma.review.findMany({
    where: { asin, rating: selectedRating ? +selectedRating : undefined },
    orderBy: { date: 'desc' },
    include: {
      product: {
        select: { asin: true, rating: true, ratingsTotal: true, ratingBreakdown: true }
      }
    },
    skip: start,
    take: +limit
  });

  // const reviewsCount = await prisma.review.count({
  //   where: { asin, rating: selectedRating ? +selectedRating : undefined }
  // });
  const reviewsCount = reviews.length;
  const totalPages = Math.ceil(reviewsCount / +limit);
  const hasNextPage = end < reviewsCount;
  const hasPrevPage = start > 0;

  const product = reviews[0].product;
  if (!product) return notFound();

  const ratingsTotal = product.ratingsTotal;

  if (ratingsTotal === 0 || reviews.length === 0) {
    return (
      <Card className='space-y-2'>
        <CardHeader>
          <CardTitle className='text-xl font-medium'>No reviews yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Be the first to review this product and help others make a better decision.
          </p>
        </CardContent>
        <CardFooter>
          <AddReview product={product} />
        </CardFooter>
      </Card>
    );
  }

  let content;
  if (selectedRating && reviews.length === 0) {
    content = <p> No reviews for this rating! </p>;
  }

  return (
    <section className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8'>
      <RatingOverview product={product} searchParams={searchParams} />

      <Card className='p-6 flex-1 lg:basis-full'>
        <div className='space-y-8'>
          <ReviewsPaginationButtons
            asin={asin}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            totalPages={totalPages}
          />

          {content && <CardContent>{content}</CardContent>}

          {reviews.map(review => (
            <ReviewItem key={review.id} {...review} />
          ))}
        </div>
        <CardFooter className='p-6 px-0'>
          <AddReview product={product} />
        </CardFooter>
      </Card>
    </section>
  );
}

type ProductReview = Pick<
  TProduct,
  'asin' | 'rating' | 'ratingsTotal' | 'ratingBreakdown'
>;
type RatingOverviewProps = { product: ProductReview; searchParams: SearchParams };

function RatingOverview({ product, searchParams }: RatingOverviewProps) {
  const { selectedRating } = extractSearchParams(searchParams, '5');
  const { asin, rating, ratingsTotal } = product;
  const ratingBreakdown = product.ratingBreakdown as RatingBreakdown;

  return (
    <div className='grid gap-4 flex-1 lg:basis-1/2'>
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
