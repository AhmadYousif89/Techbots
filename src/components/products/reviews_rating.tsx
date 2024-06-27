'use client';

import { useRouter } from 'next/navigation';

import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { ProductType } from '../../../data';

type ReviewsRatingProps = {
  pId: number;
  limit: string;
  selectedRating: string;
  totalReviewsCount: number;
  reviews: ProductType['reviews']['data'];
};

export function ReviewsRating({
  pId,
  limit,
  reviews,
  selectedRating,
  totalReviewsCount
}: ReviewsRatingProps) {
  const router = useRouter();

  return (
    <Card className='w-full py-4 px-2 max-w-sm shadow space-y-2'>
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = 5 - index;
        const reviewsCountPerStar = reviews.filter(
          review => review.rating === starIndex
        ).length;

        const starReviewsPercentage = (reviewsCountPerStar / totalReviewsCount) * 100;

        return (
          <TooltipProvider key={starIndex}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={+selectedRating == starIndex ? 'outline' : 'ghost'}
                  onClick={() => {
                    router.push(
                      `/products/${pId}?page=1&limit=${limit}&filterByRating=${starIndex}#reviews`
                    );
                  }}
                  className='w-full grid grid-cols-[auto,1fr,auto] items-center gap-2 h-8 py-0'>
                  <p className='flex items-center justify-center'>
                    <span className='text-xs sm:text-sm mr-1 text-muted-foreground font-semibold'>
                      {starIndex}
                    </span>
                    <span className='star text-sm sm:text-lg text-yellow-500'>★</span>
                  </p>
                  <Progress
                    value={starReviewsPercentage}
                    className='h-1 [&>*]:bg-yellow-500'
                  />
                  <p className='text-xs sm:text-sm text-muted-foreground font-medium text-center cursor-default'>
                    {Math.round(starReviewsPercentage)}%
                  </p>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-xs'>View all {starIndex} star rating reviews</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </Card>
  );
}
