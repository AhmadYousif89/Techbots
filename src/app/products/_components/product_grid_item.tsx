import Link from 'next/link';
import Image from 'next/image';
import { SearchParams } from '@/app/products/_lib/types';
import { TProduct } from '../_lib/types';
import { extractSearchParams } from '@/app/products/_lib/utils';
import { RatingStars } from './reviews/rating_stars';

import { Separator } from '@/components/ui/separator';
import { AddToCartButton } from '../../cart/_components/add_to_cart_button';
import { AddToWishlistButton } from '@/components/wishlist/add_to_wishlist_button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
  searchParams: SearchParams;
  product: TProduct;
};

export async function ProductGridItem({ product, searchParams }: Props) {
  const {
    page,
    limit,
    category: cat,
    brand,
    min,
    max,
    sort,
    grid
  } = extractSearchParams(searchParams);
  const params = new URLSearchParams({
    ...(page && { page }),
    ...(limit && { limit }),
    ...(cat ? { cat } : {}),
    ...(brand ? { brand } : {}),
    ...(sort ? { sort } : {}),
    ...(min ? { min } : {}),
    ...(max ? { max } : {}),
    ...(grid ? { grid } : {})
  });
  const { asin, rating, mainImage, title, price, category } = product;
  const prodUrl = `/products/${asin}?cat=${category}`;

  return (
    <Card className='grid auto-rows-[150px_3px_1fr_3px_auto] md:auto-rows-[200px_3px_1fr_3px_auto] justify-self-center p-2 rounded shadow-none border-0 max-w-xs ring-offset-4 active:ring-1 active:ring-muted'>
      <Link href={prodUrl} className='place-self-center rounded'>
        <Image
          src={mainImage}
          alt={title}
          width={150}
          height={150}
          className={cn(
            'size-28 object-contain',
            grid === '3' && 'lg:size-36 p-0',
            grid === '2' && 'lg:size-44 p-2'
          )}
        />
      </Link>
      <Separator />
      <CardHeader className='p-0 py-4 justify-center space-y-0'>
        <Link href={prodUrl}>
          <CardTitle
            className={cn(
              'text-xs font-medium hover:underline hover:text-blue-700',
              grid === '2' && 'text-sm'
            )}>
            {title}
          </CardTitle>
        </Link>
        <div className='text-xs text-muted-foreground md:text-sm font-medium pt-4 mt-auto self-end flex-1 grid grid-cols-2 justify-between w-full items-end'>
          <RatingStars productRating={rating} showTotalReviews={false} size='xs' />
          <span className='place-self-end font-semibold'>${price.toFixed(2)}</span>
        </div>
      </CardHeader>
      <Separator />
      <CardFooter className='p-0 pt-2 gap-4 justify-between'>
        <AddToCartButton
          size={'sm'}
          action='BuyNow'
          product={product}
          forceRedirect={`/cart?${params.toString()}`}
        />
        <AddToWishlistButton logoSize={18} product={product} />
      </CardFooter>
    </Card>
  );
}
