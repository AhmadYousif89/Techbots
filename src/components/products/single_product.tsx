'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { CircleUserRound } from 'lucide-react';
import { ReviewsPagination } from './reviews_pagination';
import { ReviewsRating } from './reviews_rating';
import { RatingStars } from './rating_stars';
import { ProductType } from '../../../data';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { AddReview } from './add_review';

export function ProductCarousel({ product }: { product: ProductType }) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <>
      <figure>
        <Image
          src={product.images[imageIndex]}
          alt={product.name}
          width={500}
          height={500}
          className='w-full h-full object-cover max-w-screen-sm mx-auto'
        />
        <figcaption className='sr-only'>{product.overView}</figcaption>
        <Separator />
        <Carousel className='max-w-screen-md mx-auto' opts={{ dragFree: true }}>
          <CarouselContent className='p-4'>
            {product.images.map((image, index) => (
              <CarouselItem key={index} className='basis-3/12 '>
                <Button
                  variant={'outline'}
                  className={cn([
                    'p-0 h-auto my-4 sm:w-24 sm:h-24 border-0',
                    imageIndex === index && 'border-2 shadow-sm'
                  ])}
                  onClick={() => setImageIndex(index)}>
                  <Image src={image} alt={product.name} width={100} height={100} />
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </figure>
    </>
  );
}

export function ProductPicker({ colors }: { colors: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <div className='h-8'>
      <RadioGroup className='flex items-center gap-1 sm:gap-2 h-full'>
        {colors.map((color, index) => (
          <div key={color} className='relative px-2 flex items-center space-x-2'>
            <RadioGroupItem
              value={selectedColor === color ? selectedColor : ''}
              id={`${index}-${color}`}
              className='size-5 text-transparent peer'
              style={{ backgroundColor: color }}
              data-state={selectedColor === color}
              aria-checked={selectedColor === color}
              onClick={() => setSelectedColor(color)}
            />
            <Label
              htmlFor={`${index}-${color}`}
              className='peer-data-[state=true]:border-green-500 absolute -left-[4px] aspect-square rounded-full size-7 border-2 cursor-pointer'
            />
          </div>
        ))}
        <Button
          variant={'link'}
          className={cn(selectedColor ? 'block' : 'hidden')}
          onClick={() => setSelectedColor('')}>
          x clear
        </Button>
      </RadioGroup>
    </div>
  );
}

type ProductReviewsProps = {
  product: ProductType;
  filteredReviews: ProductType['reviews']['data'];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
};
export function ProductReviews({
  product,
  filteredReviews,
  hasPrevPage,
  hasNextPage,
  totalPages
}: ProductReviewsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalReviewsCount = product.reviews.data.length;
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '5';
  const selectedRating = searchParams.get('filterByRating') ?? '';

  if (totalReviewsCount === 0) {
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

  let content;
  if (filteredReviews.length === 0) {
    content = <p> No reviews for this rating! </p>;
  }

  return (
    <section className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8'>
      <div className='grid gap-4 flex-1 lg:basis-1/2'>
        <Card className='grid items-center justify-center max-w-32 aspect-square p-4 shadow'>
          <h3 className='grid items-center justify-center place-self-center text-2xl font-semibold rounded-full ring-1 ring-zinc-300 shadow aspect-square p-2 text-muted-foreground'>
            {product.reviews.rating}
          </h3>
          <RatingStars
            rating={product.reviews.rating}
            reviewsCount={totalReviewsCount}
            showTotalReviews={false}
            size={'xs'}
          />
          <p className='text-sm text-center text-muted-foreground font-medium'>
            {totalReviewsCount.toLocaleString()} rating
          </p>
        </Card>

        <ReviewsRating
          limit={limit}
          pId={product.id}
          reviews={product.reviews.data}
          selectedRating={selectedRating}
          totalReviewsCount={totalReviewsCount}
        />
      </div>

      <Card className='p-6 flex-1 lg:basis-full'>
        <div className='space-y-8'>
          <div className='flex justify-between items-center'>
            <CardTitle className='font-medium text-xl mb-auto'>
              {+selectedRating == 5
                ? '5 Star'
                : +selectedRating == 4
                ? '4 Star'
                : +selectedRating == 3
                ? '3 Star'
                : +selectedRating == 2
                ? '2 Star'
                : +selectedRating == 1
                ? '1 Star'
                : 'Top'}{' '}
              Reviews
            </CardTitle>
            <div className='grid items-center gap-y-2'>
              <Button
                size='sm'
                variant='outline'
                className='place-self-center'
                disabled={!selectedRating}
                onClick={() => {
                  router.push(
                    `/products/${product.id}?page=1&limit=${limit}&filterByRating=#reviews`
                  );
                }}>
                View All
              </Button>
              <ReviewsPagination
                pId={product.id}
                page={+page}
                limit={+limit}
                selectedRating={selectedRating}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
              />
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
                      {review.author}
                    </h4>
                    <p className='text-xs text-muted-foreground font-medium row-[1] col-[2]'>
                      {review.createdAt}
                    </p>
                    <RatingStars
                      size='xs'
                      rating={review.rating}
                      showTotalReviews={false}
                    />
                  </div>
                </CardHeader>
              </div>
              <CardContent className='text-muted-foreground'>
                {review.comment}
              </CardContent>
            </article>
          ))}
        </div>
        <CardFooter className='p-6 px-0'>
          <AddReview productName={product.name} />
        </CardFooter>
      </Card>
    </section>
  );
}
