import { Review } from '@prisma/client';
import { RatingStars } from './rating_stars';
import { CircleUserRound } from 'lucide-react';
import { ReviewDate, ReviewProfile } from '@/app/products/_lib/types';
import { CardContent, CardHeader } from '@/components/ui/card';

export function ReviewItem(review: Review) {
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
    <article className='space-y-2'>
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
}
