import Link from 'next/link';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import { AddToCartButton } from '../../cart/_components/add_to_cart_button';
import { AddToWishlistButton } from '@/components/wishlist/add_to_wishlist_button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RatingStars } from './reviews/rating_stars';
import { SearchParams } from '@/lib/types';
import { Product } from '../_actions/actions';
import { extractSearchParams } from '@/lib/utils';

type Props = {
  searchParams: SearchParams;
  product: Product;
};

export async function ProductGridItem({ product, searchParams }: Props) {
  const { page, limit, category, sort, grid } = extractSearchParams(searchParams);

  return (
    <Card className='grid auto-rows-[150px_3px_1fr_3px_auto] md:auto-rows-[200px_3px_1fr_3px_auto] max-w-xs justify-self-center p-2 shadow-none border-0'>
      <Link
        href={`/products/${product.asin}`}
        className='place-self-center rounded active:border active:border-blue-500'>
        <Image
          src={product.mainImage}
          alt={product.title}
          width={100}
          height={100}
          className='size-28 sm:size-36 p-2 object-contain'
        />
      </Link>
      <Separator />
      <CardHeader className='p-0 py-4 justify-center space-y-0'>
        <Link href={`/products/${product.asin}`}>
          <CardTitle className='text-xs font-medium hover:underline hover:text-blue-700'>
            {product.title}
          </CardTitle>
        </Link>
        <div className='text-xs text-muted-foreground md:text-sm font-medium pt-4 mt-auto self-end flex-1 grid grid-cols-2 justify-between w-full items-end'>
          <RatingStars
            productRating={product.rating}
            showTotalReviews={false}
            size='xs'
          />
          <span className='place-self-end font-semibold'>
            $ {product.price.toFixed(2)}
          </span>
        </div>
      </CardHeader>
      <Separator />
      <CardFooter className='p-0 pt-2 gap-4 justify-between'>
        <AddToCartButton
          action='BuyNow'
          product={product}
          forceRedirect={`/cart?page=${page}&limit=${limit}&category=${category}&sort=${sort}&grid=${grid}`}
        />
        <AddToWishlistButton logoSize={18} product={product} />
      </CardFooter>
    </Card>
  );
}
