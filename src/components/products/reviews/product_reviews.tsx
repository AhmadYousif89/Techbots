'use client';

import Image from 'next/image';
import router from 'next/router';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, CircleUserRound } from 'lucide-react';
import { Product } from '@/lib/types';

import { AddReview } from './add_review';
import { RatingStars } from './rating_stars';
import PaginationButton from '../../pagination_button';

import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Carousel, CarouselContent, CarouselItem } from '../../ui/carousel';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../ui/tooltip';

type ProductReviewsProps = {
  product: Product;
  selectedRating: string;
  page: string;
  limit: string;
  filteredReviews: Product['top_reviews'];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
};
export function ProductReviews({
  product,
  filteredReviews,
  selectedRating,
  page,
  limit,
  hasPrevPage,
  hasNextPage,
  totalPages
}: ProductReviewsProps) {
  const router = useRouter();

  const ratingTotal = product.ratings_total;

  if (ratingTotal === 0) {
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
          <Button>Write a review</Button>
        </CardFooter>
      </Card>
    );
  }

  let reviewsTitle = 'Top Reviews';
  for (let i = 0; i < 5; i++) {
    if (selectedRating === `${5 - i}`) {
      reviewsTitle = `${5 - i} Star Reviews`;
      break;
    }
  }

  let content;
  if (filteredReviews.length === 0) {
    content = <p> No reviews for this rating! </p>;
  }

  return (
    <section className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8'>
      <RatingOverview product={product} />

      <Card className='p-6 flex-1 lg:basis-full'>
        <div className='space-y-8'>
          <div className='flex justify-between items-center'>
            <CardTitle className='font-medium text-xl mb-auto'>{reviewsTitle}</CardTitle>
            <div className='grid items-center gap-y-2'>
              <Button
                size='sm'
                variant='outline'
                className='place-self-center'
                disabled={!selectedRating}
                onClick={() => {
                  router.push(
                    `/products/${product.asin}?page=1&limit=${limit}&filterByRating=#reviews`
                  );
                }}>
                View All
              </Button>

              <div className='flex items-center gap-4'>
                <PaginationButton
                  elementId='reviews'
                  disabled={!hasPrevPage}
                  href={`/products/${product.asin}?page=${
                    +page - 1
                  }&limit=${limit}&filterByRating=${selectedRating}#reviews`}>
                  <ChevronLeft />
                </PaginationButton>
                <span className='text-foreground text-sm'>
                  {page} / {totalPages}
                </span>
                <PaginationButton
                  elementId='reviews'
                  disabled={!hasNextPage}
                  href={`/products/${product.asin}?page=${
                    +page + 1
                  }&limit=${limit}&filterByRating=${selectedRating}#reviews`}>
                  <ChevronRight />
                </PaginationButton>
              </div>
            </div>
          </div>

          {content && <CardContent>{content}</CardContent>}

          {filteredReviews.map((review, index) => (
            <article key={index} className='space-y-2'>
              <div className='flex flex-col'>
                <CardHeader className='flex-row p-0 gap-4'>
                  <CircleUserRound strokeWidth={1} size={40} className='my-auto' />
                  <div className=''>
                    <h4 className='text-sm font-medium col-[2] row-[1]'>
                      {review.profile.name}
                    </h4>
                    <p className='text-xs text-muted-foreground font-medium mt-1 row-[1] col-[2]'>
                      {new Date(review.date.utc).toLocaleString()}
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
          ))}
        </div>
        <CardFooter className='p-6 px-0'>
          <AddReview productName={product.title} />
        </CardFooter>
      </Card>
    </section>
  );
}

function RatingOverview({ product }: { product: Product }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const limit = searchParams.get('limit') ?? '5';
  const selectedRating = searchParams.get('filterByRating') ?? '';
  const ratingBreakdown = product.rating_breakdown;
  const totalReviewsCount = product.ratings_total;

  return (
    <div className='grid gap-4 flex-1 lg:basis-1/2'>
      <Card className='grid items-center justify-center max-w-32 aspect-square p-4 shadow-sm'>
        <h3 className='grid items-center justify-center place-self-center size-12 text-2xl font-semibold rounded-full ring-1 ring-zinc-300 shadow-sm aspect-square p-2 text-muted-foreground'>
          {product.rating}
        </h3>
        <RatingStars
          productRating={product.rating}
          reviewsCount={product.ratings_total}
          showTotalReviews={false}
          size={'sm'}
        />
        <p className='text-sm text-center text-muted-foreground font-medium'>
          {product.ratings_total.toLocaleString()} rating
        </p>
      </Card>

      <Card className='w-full py-4 px-2 max-w-sm shadow-sm space-y-2'>
        {Array.from(Object.keys(ratingBreakdown)).map((rate, index) => {
          const starIndex = 5 - index;
          const ratingCount = ratingBreakdown[rate as keyof typeof ratingBreakdown].count;
          const ratingPercentage =
            ratingBreakdown[rate as keyof typeof ratingBreakdown].percentage;

          return (
            <TooltipProvider key={starIndex}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={+selectedRating == starIndex ? 'outline' : 'ghost'}
                    onClick={() => {
                      router.push(
                        `/products/${product.asin}?page=1&limit=${limit}&filterByRating=${starIndex}#reviews`
                      );
                    }}
                    className='w-full grid grid-cols-[auto,1fr,auto] items-center gap-2 h-8 py-0'>
                    <p className='flex items-center justify-center'>
                      <span className='text-sm mr-1 text-muted-foreground font-semibold'>
                        {starIndex}
                      </span>
                      <span className='text-xl text-yellow-500'>★</span>
                    </p>
                    <Progress
                      value={ratingPercentage}
                      className='h-2 [&>*]:bg-yellow-500'
                    />
                    <p className='text-sm text-muted-foreground font-medium text-center cursor-default'>
                      {ratingPercentage}%
                    </p>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='text-xs'>
                    <span className='font-bold'>{ratingCount} </span>
                    <span>review{ratingCount !== 1 ? 's' : ''} represents </span>
                    <span className='font-bold'>{ratingPercentage}% </span>of the total
                    <span className='font-bold'> {totalReviewsCount} </span>
                    reviews of the <span className='font-bold'>{starIndex} </span>
                    star rating.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </Card>
    </div>
  );
}
