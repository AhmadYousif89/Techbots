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

type Props = {
  searchParams: SearchParams;
  product: TProduct;
};

export async function ProductGridItem({ product, searchParams }: Props) {
  const { page, limit, sort, grid } = extractSearchParams(searchParams);
  const { asin, rating, mainImage, title, price, category } = product;
  const prodUrl = `/products/${asin}?category=${category}`;
  const forceRedirectUrl = `/cart?page=${page}&limit=${limit}&category=${category}&sort=${sort}&grid=${grid}`;

  return (
    <Card className='grid auto-rows-[150px_3px_1fr_3px_auto] md:auto-rows-[200px_3px_1fr_3px_auto] max-w-xs justify-self-center p-2 shadow-none border-0'>
      <Link
        href={prodUrl}
        className='place-self-center rounded active:border active:border-blue-500'>
        <Image
          src={mainImage}
          alt={title}
          width={100}
          height={100}
          className='size-28 sm:size-36 p-2 object-contain'
        />
      </Link>
      <Separator />
      <CardHeader className='p-0 py-4 justify-center space-y-0'>
        <Link href={prodUrl}>
          <CardTitle className='text-xs font-medium hover:underline hover:text-blue-700'>
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
          action='BuyNow'
          product={product}
          forceRedirect={forceRedirectUrl}
        />
        <AddToWishlistButton logoSize={18} product={product} />
      </CardFooter>
    </Card>
  );
}
