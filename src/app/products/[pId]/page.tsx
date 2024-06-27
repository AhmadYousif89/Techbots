import { products } from '../../../../data';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RatingStars } from '@/components/products/rating_stars';
import { AddToCartButton } from '@/components/cart/add_to_cart_button';
import { SimilarProducts } from '@/components/products/similar_products';
import { AddToWishlistButton } from '@/components/wishlist/add_to_wishlist_button';
import {
  ProductCarousel,
  ProductPicker,
  ProductReviews
} from '@/components/products/single_product';

type PageProps = {
  params: { pId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SingleProductPage({ params: { pId }, searchParams }: PageProps) {
  const product = products.find(product => product.id === +pId);

  if (!product) {
    return (
      <main className='grid justify-center items-center min-h-screen max-w-screen-xl mx-auto'>
        <p className='text-2xl'>Product not found</p>
      </main>
    );
  }

  const similarProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );

  const reviews = product.reviews.data;
  const selectedRating = searchParams['filterByRating'] ?? '';
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? '5';
  const start = (+page - 1) * +limit;
  const end = start + +limit;
  let filteredReviews = selectedRating
    ? reviews.filter(review => review.rating === +selectedRating)
    : reviews;
  const totalPages = Math.ceil(filteredReviews.length / +limit);
  const hasPrevPage = start > 0;
  const hasNextPage = end < filteredReviews.length;
  filteredReviews = filteredReviews.slice(start, end);

  return (
    <main className='grid min-h-screen max-w-screen-xl mx-auto'>
      <Card className='grid items-center p-0 pb-20 rounded-none lg:grid-cols-2 lg:gap-8'>
        <ProductCarousel product={product} />
        <div className='space-y-4'>
          <CardHeader className='gap-4 max-w-[55ch]'>
            <Badge variant='outline' className='w-fit'>
              {product.category}
            </Badge>
            <div className='space-y-6'>
              <CardTitle className='text-xl'>{product.name}</CardTitle>
              <RatingStars
                rating={product.reviews.rating}
                reviewsCount={product.reviews.data.length}
              />
              <Badge
                variant={product.isStock ? 'outline' : 'destructive'}
                className={cn(
                  product.isStock ? 'bg-emerald-500 text-secondary border-0' : ''
                )}>
                {product.isStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
              {product.isNew && (
                <Badge
                  variant={'outline'}
                  className='bg-blue-500 border-0 text-background shadow ml-2'>
                  New Arrival
                </Badge>
              )}
              <Separator />
            </div>
            <CardDescription>{product.description.slice(0, 100)}</CardDescription>
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <p className='cursor-default font-medium line-through text-muted-foreground'>
                  ${product.regularPrice}
                </p>
                <p className='cursor-default font-medium'>${product.salePrice}</p>
              </div>
              <ProductPicker colors={product.colors} />
            </div>
          </CardHeader>
          <CardFooter className='gap-8'>
            <AddToCartButton product={product} />
            <AddToWishlistButton product={product} />
          </CardFooter>
        </div>
      </Card>

      <Card className='rounded-none pt-8 pb-16 space-y-8'>
        <CardHeader>
          <h2 className='text-2xl sm:text-center font-medium'>Similar Products</h2>
        </CardHeader>
        <CardContent className='px-6 m-0'>
          <SimilarProducts products={similarProducts} currentProduct={product} />
        </CardContent>
      </Card>

      <Card id='reviews' className='rounded-none py-20 sm:px-4 xl:px-8'>
        <CardHeader>
          <h2 className='text-2xl font-medium'>Customer Reviews</h2>
        </CardHeader>
        <CardContent>
          <ProductReviews
            product={product}
            filteredReviews={filteredReviews}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            totalPages={totalPages}
          />
        </CardContent>
      </Card>
    </main>
  );
}
