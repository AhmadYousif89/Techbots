import Link from 'next/link';
import { cn } from '@/lib/utils';

type RatingStarsProps = {
  productRating: number;
  reviewsCount?: string | number;
  showTotalReviews?: boolean;
  size?: 'xs' | 'sm' | 'xl';
};

export function RatingStars({
  size = 'xl',
  productRating,
  reviewsCount = '0',
  showTotalReviews = true
}: RatingStarsProps) {
  return (
    <div className='flex items-center gap-8'>
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
          className='text-muted-foreground font-medium [html:scroll-smooth] hover:underline'>
          {reviewsCount} Review{+reviewsCount !== 1 ? 's' : ''}
        </Link>
      )}
    </div>
  );
}
