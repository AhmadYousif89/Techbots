import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { extractSearchParams } from '../_lib/utils';
import { TProduct, SearchParams } from '../_lib/types';

import { RatingStars } from './reviews/rating_stars';
import { AddToCartButton } from '../../../components/cart_menu/add_button';
import { Separator } from '@/components/ui/separator';
import { AddToWishlistButton } from '@/components/wishlist_menu/add_button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  product: TProduct;
  searchParams: SearchParams;
};

export async function ProductGridItem({ product, searchParams }: Props) {
  const { asin, rating, mainImage, title, price, category } = product;
  const { grid } = extractSearchParams(searchParams);
  const prodUrl = `/products/${asin}?cat=${category}`;

  return (
    <Card className='grid auto-rows-[150px_3px_1fr_3px_auto] md:auto-rows-[200px_3px_1fr_3px_auto] justify-self-center py-2 px-4 rounded shadow-none border-0 max-w-xs ring-offset-4 hover:ring-1 hover:ring-muted'>
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
        <div className='w-full flex justify-between items-end text-muted-foreground md:text-sm font-medium pt-4 mt-auto self-end flex-1'>
          <RatingStars productRating={rating} showTotalReviews={false} size='xs' />
          <span className='text-xs place-self-end'>${price.toFixed(2)}</span>
        </div>
      </CardHeader>
      <Separator />
      <CardFooter className='p-0 pt-2 gap-4 justify-between'>
        <AddToCartButton
          size={'sm'}
          action='BuyNow'
          product={product}
          forceRedirect={true}
        />
        <AddToWishlistButton logoSize={18} product={product} />
      </CardFooter>
    </Card>
  );
}
