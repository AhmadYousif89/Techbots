import prisma from '@/lib/db';
import { ChevronLeft, ChevronRight, CircleUserRound } from 'lucide-react';

import { AddReview } from './add_review';
import { RatingStars } from './rating_stars';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { TProduct } from '../../_actions/actions';
import { extractSearchParams } from '@/lib/utils';
import { ReviewsRatingBars } from './rating_bars';
import { PaginationSection } from './paginated_reviews';
import { RatingBreakdown, ReviewDate, ReviewProfile, SearchParams } from '@/lib/types';

type ProductReviewsProps = {
  asin: string;
  searchParams: SearchParams;
};

type ProductReview = Pick<
  TProduct,
  'asin' | 'rating' | 'ratingsTotal' | 'ratingBreakdown'
>;

export async function ProductReviews({ asin, searchParams }: ProductReviewsProps) {
  const { page, limit, selectedRating } = extractSearchParams(searchParams, '5');
  const start = (+page - 1) * +limit;
  const end = start + +limit;

  const reviews = await prisma.review.findMany({
    where: { asin, rating: selectedRating ? +selectedRating : undefined },
    orderBy: { date: 'desc' },
    include: {
      product: {
        where: { asin },
        select: { asin: true, rating: true, ratingsTotal: true, ratingBreakdown: true }
      }
    },
    skip: start,
    take: +limit
  });

  const totalReviews = await prisma.review.count({
    where: { asin, rating: selectedRating ? +selectedRating : undefined }
  });
  const totalPages = Math.ceil(totalReviews / +limit);
  const hasNextPage = end < totalReviews;
  const hasPrevPage = start > 0;

  if (!reviews) throw new Error(`Reviews for product with ASIN ${asin} not found!`);
  const product = reviews[0]?.product;
  if (!product) throw new Error(`Product with ASIN ${asin} not found!`);

  const ratingsTotal = product?.ratingsTotal ?? 0;

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
          <PaginationSection
            asin={asin}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            totalPages={totalPages}
          />

          {content && <CardContent>{content}</CardContent>}

          {reviews.map((review, index) => {
            let reviewer;
            let time = 'a few moments ago';
            if (review.profile && typeof review.profile === 'object') {
              const profile = review.profile as ReviewProfile;
              reviewer = profile.name ?? 'Anonymous';
            }
            if (review.date && typeof review.date === 'object') {
              const date = review.date as ReviewDate;
              time = date.utc;
            }

            return (
              <article key={index} className='space-y-2'>
                <div className='flex flex-col'>
                  <CardHeader className='flex-row p-0 gap-4'>
                    <CircleUserRound strokeWidth={1} size={40} className='my-auto' />
                    <div className=''>
                      <h4 className='text-sm font-medium col-[2] row-[1]'>{reviewer}</h4>
                      <p className='text-xs text-muted-foreground font-medium mt-1 row-[1] col-[2]'>
                        {new Date(time).toLocaleString()}
                      </p>
                      <RatingStars
                        size='sm'
                        productRating={review.rating}
                        showTotalReviews={false}
                      />
                    </div>
                  </CardHeader>
                </div>
                <CardContent className='text-muted-foreground'>
                  {review.body.split('Read')[0]}
                </CardContent>
              </article>
            );
          })}
        </div>
        <CardFooter className='p-6 px-0'>
          <AddReview product={product} />
        </CardFooter>
      </Card>
    </section>
  );
}

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
