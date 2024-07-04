import { cn } from '@/lib/utils';
import { getProductByAsin } from '@/lib/actions';

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
import { RatingStars } from '@/components/products/reviews/rating_stars';
import { AddToCartButton } from '@/components/cart/add_to_cart_button';
import { SimilarProducts } from '@/components/products/similar_products';
import { AddToWishlistButton } from '@/components/wishlist/add_to_wishlist_button';
import { ProductReviews } from '@/components/products/reviews/product_reviews';
import { ProductCarousel } from '@/components/products/product_carousel';
import { Suspense } from 'react';
import { SimilarItemSkeleton } from '@/components/products/skeletons/similar_item_skeleton';
import { ItemCarouselSkeleton } from '@/components/products/skeletons/item_carousel_skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

type PageProps = {
  params: { pId: string };
  searchParams: { [key: string]: string | undefined };
};

export default async function SingleProductPage({
  params: { pId },
  searchParams
}: PageProps) {
  const product = await getProductByAsin(pId);

  if (!product) {
    return (
      <main className='grid justify-center items-center min-h-screen max-w-screen-xl mx-auto bg-foreground'>
        <p className='text-xl'>Product not found</p>
      </main>
    );
  }

  const reviews = product.top_reviews != null ? product.top_reviews : [];
  const selectedRating = searchParams['filterByRating'] ?? '';
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? '5';
  const start = (+page - 1) * +limit;
  const end = start + +limit;
  let filteredReviews =
    reviews && selectedRating
      ? reviews.filter(review => review.rating === +selectedRating)
      : reviews;
  const totalPages = Math.ceil(filteredReviews.length / +limit);
  const hasPrevPage = start > 0;
  const hasNextPage = end < filteredReviews.length;
  filteredReviews = filteredReviews.slice(start, end);

  const productSpecs = parseDataString(product.specifications_flat);
  const productFeatures = parseDataString(product.feature_bullets_flat);

  return (
    <main className='grid min-h-screen max-w-screen-xl mx-auto'>
      <Card className='grid items-center pb-10 lg:py-10 rounded-none lg:grid-cols-2 lg:gap-10'>
        <Suspense fallback={<ItemCarouselSkeleton />}>
          <ProductCarousel product={product} />
        </Suspense>

        <div>
          <CardHeader className='gap-4 max-w-prose'>
            <Badge variant='outline' className='w-fit'>
              {product.category}
            </Badge>
            <div className='space-y-6'>
              <CardTitle className='text-sm md:text-[16px] lg:text-lg font-medium text-balance'>
                {product.title}
              </CardTitle>
              <RatingStars
                productRating={product.rating}
                reviewsCount={product.ratings_total.toLocaleString()}
              />
              <Badge
                variant={product.stock_quantity > 0 ? 'outline' : 'destructive'}
                className={cn(
                  product.stock_quantity > 0
                    ? 'bg-emerald-500 text-secondary border-0'
                    : ''
                )}>
                {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </Badge>
              <Separator />
            </div>
          </CardHeader>
          <CardContent className='max-w-prose'>
            {product.description && (
              <CardDescription className='mb-4 border-b pb-2'>
                {product.description}
              </CardDescription>
            )}
            <div className='flex gap-8 justify-between'>
              <div className='space-y-4'>
                <Badge className='text-sm shadow-sm py-1' variant={'outline'}>
                  <p className='cursor-default text-muted-foreground font-medium'>
                    {product.price}
                  </p>
                </Badge>
                {product.color && (
                  <div className='flex items-center font-medium text-sm ml-2'>
                    Color <span className='text-foreground ml-4'>{product.color}</span>
                  </div>
                )}
              </div>
              <div className='flex items-center gap-8'>
                <AddToCartButton action='addToCart' product={product} />
                <AddToWishlistButton product={product} />
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex-col items-stretch max-w-prose'>
            {productFeatures && (
              <ProductDetailsTable type='feats' data={productFeatures} />
            )}
            {productSpecs && <ProductDetailsTable type='specs' data={productSpecs} />}
            {!productFeatures && !productSpecs && (
              <span>
                {product.title} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis ipsam quas optio itaque, quo aperiam autem rerum ratione sunt.
                Voluptates distinctio animi veniam, libero aliquid harum quisquam ullam
                beatae iusto accusantium magnam laudantium officiis aperiam, asperiores
                incidunt in aspernatur rem. Qui temporibus libero eum iure ratione quia,
                corporis eius voluptatum.
              </span>
            )}
          </CardFooter>
        </div>
      </Card>

      <Card className='rounded-none pt-8 pb-16 space-y-8'>
        <CardHeader>
          <h2 className='text-2xl sm:text-center font-medium'>Similar Products</h2>
        </CardHeader>
        <CardContent className='px-6 pb-10 m-0'>
          <Suspense fallback={<SimilarItemSkeleton />}>
            <SimilarProducts pId={pId} category={product.category} />
          </Suspense>
        </CardContent>
      </Card>

      <Card id='reviews' className='rounded-none py-10 sm:px-4 xl:px-8'>
        <CardHeader>
          <h2 className='text-2xl font-medium'>Customer Reviews</h2>
        </CardHeader>
        <CardContent>
          <ProductReviews
            product={product}
            page={page}
            limit={limit}
            selectedRating={selectedRating}
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

function parseDataString(dataString: string) {
  const dataObject: { [key: string]: string } = {};
  if (!dataString) return dataObject;
  const entries = dataString.split('. ');
  entries.forEach(entry => {
    const [key, value] = entry.split(': ');
    if (key && value) {
      dataObject[key] = value;
    }
  });
  return dataObject;
}

type ProductDetailsTableProps = {
  data: Record<string, string>;
  type: 'specs' | 'feats';
};

const ProductDetailsTable = ({ data, type }: ProductDetailsTableProps) => {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='details' className={cn(type == 'specs' ? 'border-b-0' : '')}>
        <AccordionTrigger
          className={cn(
            `text-xs text-muted-foreground uppercase hover:text-foreground/50`,
            type == 'feats' && 'sm:pt-0'
          )}>
          {type === 'specs' ? 'Specifications' : 'Features'}
        </AccordionTrigger>
        <AccordionContent>
          <table className='bg-secondary text-xs'>
            <thead className='bg-primary text-secondary'>
              <tr>
                <th className='w-1/4 p-2'>Attribute</th>
                <th className='w-3/4 p-2'>Value</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td className='border px-4 py-2'>{key}</td>
                  <td className='border px-4 py-2'>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
