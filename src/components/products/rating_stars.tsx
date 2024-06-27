import Link from 'next/link';
import { cn } from '@/lib/utils';

type RatingStarsProps = {
  rating: number;
  reviewsCount?: number;
  showTotalReviews?: boolean;
  size?: 'xs' | 'sm';
};

export function RatingStars({
  size,
  rating,
  reviewsCount = 0,
  showTotalReviews = true
}: RatingStarsProps) {
  return (
    <div className='flex items-center gap-8'>
      <div
        className={cn(
          'relative',
          'before:text-3xl before:content-["★★★★★"] before:text-muted-foreground',
          size === 'sm' && 'before:text-2xl',
          size === 'xs' && 'before:text-xl'
        )}>
        <div
          className={cn(
            'absolute top-0 left-0 overflow-hidden',
            'before:text-3xl before:content-["★★★★★"] before:text-yellow-500',
            size === 'sm' && 'before:text-2xl',
            size === 'xs' && 'before:text-xl'
          )}
          style={{ width: (rating / 5) * 100 + '%' }}></div>
      </div>
      {showTotalReviews && (
        <Link
          href='#reviews'
          className='text-muted-foreground font-medium [html:scroll-smooth]'>
          {reviewsCount} Review{reviewsCount !== 1 ? 's' : ''}
        </Link>
      )}
    </div>
  );
}
