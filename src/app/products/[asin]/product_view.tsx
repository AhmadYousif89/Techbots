import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { SearchParams } from '@/lib/types';
import { capitalizeString, cn } from '@/lib/utils';
import { getProductByAsin } from '../_actions/actions';
import { RatingStars } from '../_components/reviews/rating_stars';
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
import { ProductCarousel } from '../_components/product_carousel';
import { AddToCartButton } from '@/app/cart/_components/add_to_cart_button';
import { AddToWishlistButton } from '@/components/wishlist/add_to_wishlist_button';
import { ItemCarouselSkeleton } from '../_components/skeletons/item_carousel_skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

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

type SingleProductViewProps = {
  asin: string;
  searchParams: SearchParams;
};

export async function SingleProductView({ asin, searchParams }: SingleProductViewProps) {
  const product = await getProductByAsin(asin, searchParams);

  const productSpecs = parseProductDetails(product.specificationsFlat);
  const productFeatures = parseProductDetails(product.featureBulletsFlat);

  if (!product) {
    return notFound();
  }

  return (
    <Card className='grid items-center pb-10 lg:pb-10 rounded-none lg:grid-cols-2 lg:gap-10'>
      <Suspense fallback={<ItemCarouselSkeleton />}>
        <ProductCarousel product={product} />
      </Suspense>

      <div>
        <CardHeader className='gap-4 max-w-prose'>
          <Badge variant='outline' className='w-fit'>
            {capitalizeString(product.category)}
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
          {productFeatures && <ProductDetailsTable type='feats' data={productFeatures} />}
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
  );
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
