'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

type RatingStarsProps = {
  className?: string;
  productRating: number;
  reviewsCount?: string | number;
  showTotalReviews?: boolean;
  size?: 'xs' | 'sm' | 'xl';
};

export function RatingStars({
  className,
  size = 'xl',
  productRating,
  reviewsCount = '0',
  showTotalReviews = true,
}: RatingStarsProps) {
  return (
    <div className={cn('flex items-center gap-8', className)}>
      <div
        className={cn(
          'relative',
          'before:text-3xl before:content-["★★★★★"] before:text-muted-foreground',
          size === 'xl' && 'before:text-2xl',
          size === 'sm' && 'before:text-lg',
          size === 'xs' && 'before:text-sm'
        )}>
        <div
          className={cn(
            'absolute top-0 left-0 overflow-hidden',
            'before:text-3xl before:content-["★★★★★"] before:text-yellow-500',
            size === 'xl' && 'before:text-2xl',
            size === 'sm' && 'before:text-lg',
            size === 'xs' && 'before:text-sm'
          )}
          style={{ width: (productRating / 5) * 100 + '%' }}></div>
      </div>
      {showTotalReviews && (
        <Link
          href='#reviews'
          className='text-muted-foreground font-medium hover:underline'>
          {reviewsCount} Review{+reviewsCount !== 1 ? 's' : ''}
        </Link>
      )}
    </div>
  );
}
