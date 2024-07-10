import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { SearchParams } from '@/lib/types';
import { getProductByAsin } from '../_actions/actions';

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
import { RatingStars } from '@/app/products/_components/reviews/rating_stars';
import { AddToCartButton } from '@/app/cart/_components/add_to_cart_button';
import { SimilarProducts } from '@/app/products/_components/similar_products';
import { AddToWishlistButton } from '@/components/wishlist/add_to_wishlist_button';
import { ProductReviews } from '@/app/products/_components/reviews/product_reviews';
import { ProductCarousel } from '@/app/products/_components/product_carousel';
import { SimilarItemSkeleton } from '@/app/products/_components/skeletons/similar_item_skeleton';
import { ItemCarouselSkeleton } from '@/app/products/_components/skeletons/item_carousel_skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { pId: string };
  searchParams: SearchParams;
};

export default async function SingleProductPage({ params, searchParams }: PageProps) {
  const { pId } = params;
  const {
    product,
    filteredReviews,
    selectedRating,
    page,
    limit,
    totalPages,
    hasPrevPage,
    hasNextPage
  } = await getProductByAsin(pId, searchParams);

  if (!product) {
    return notFound();
  }

  const productSpecs = parseProductDetails(product.specificationsFlat);
  const productFeatures = parseProductDetails(product.featureBulletsFlat);

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
                reviewsCount={product.ratingsTotal.toLocaleString()}
              />
              <div className='flex items-center justify-between gap-4'>
                <Badge
                  variant={product.stockQuantity > 0 ? 'outline' : 'destructive'}
                  className={cn(
                    product.stockQuantity > 0
                      ? 'bg-emerald-500 text-secondary border-0'
                      : ''
                  )}>
                  {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </Badge>
                {product.color && (
                  <div className='flex items-center text-muted-foreground font-medium text-sm ml-2'>
                    Color : <Badge className='ml-4'>{product.color}</Badge>
                  </div>
                )}
              </div>
              <Separator />
            </div>
          </CardHeader>
          <CardContent className='max-w-prose'>
            {product.description && (
              <CardDescription className='mb-4 border-b pb-2'>
                {product.description}
              </CardDescription>
            )}
            <div className='flex flex-col gap-8'>
              <div className='flex items-center justify-between gap-4 col-span-full'>
                <Badge className='text-sm shadow-sm py-1' variant={'outline'}>
                  <p className='cursor-default text-muted-foreground font-medium'>
                    $ {product.price.toFixed(2)}
                  </p>
                </Badge>
                <div className='flex items-center gap-4 lg:gap-8'>
                  <AddToCartButton action='addToCart' product={product} />
                  <AddToWishlistButton logoSize={20} product={product} />
                </div>
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

function parseProductDetails(data: string | null) {
  const obj: { [key: string]: string } = {};
  if (!data) return obj;
  const parts = data.split('. ');

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    // Check if this part contains a colon and is not the last part
    if (part.includes(':') && i < parts.length - 1) {
      const item = part.split(':').map(item => item.trim());
      let key = item[0];
      const value = item[1];
      // Remove brackets from keys if present
      if (key.startsWith('[') && key.endsWith(']')) {
        key = key.slice(1, -1);
      }

      obj[key] = value;
    }
  }

  return obj;
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
