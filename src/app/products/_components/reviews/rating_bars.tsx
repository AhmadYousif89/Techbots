'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { RatingBreakdown, RatingDetails } from '@/lib/types';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { extractSearchParams } from '@/lib/utils';

type ReviewsRatingBarsProps = {
  asin: string;
  ratingBreakdown: RatingBreakdown;
  ratingsTotal: number;
};

export function ReviewsRatingBars({
  asin,
  ratingsTotal,
  ratingBreakdown
}: ReviewsRatingBarsProps) {
  const router = useRouter();
  const params = useSearchParams();
  const { selectedRating, category } = extractSearchParams(params.entries(), '5');
  const keys: Array<keyof RatingBreakdown> = [
    'five_star',
    'four_star',
    'three_star',
    'two_star',
    'one_star'
  ];

  return (
    <Card className='w-full py-4 px-2 max-w-sm shadow-sm space-y-2'>
      {keys.map((rate, index) => {
        console.log(ratingBreakdown);
        const starIndex = 5 - index;
        const ratingDetail = ratingBreakdown[
          rate as keyof RatingBreakdown
        ] as RatingDetails;
        const ratingCount = ratingDetail.count;
        const ratingPercentage = ratingDetail.percentage;

        return (
          <TooltipProvider key={starIndex}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={+selectedRating == starIndex ? 'outline' : 'ghost'}
                  onClick={() => {
                    router.push(
                      `/products/${asin}?page=1&limit=5&category=${category}&selectedRating=${starIndex}#reviews`
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
                  <span className='font-bold'> {ratingsTotal} </span>
                  reviews of the <span className='font-bold'>{starIndex} </span>
                  star rating.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </Card>
  );
}
