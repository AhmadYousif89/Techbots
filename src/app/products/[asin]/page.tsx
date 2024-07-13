import { Suspense } from 'react';
import { SearchParams } from '@/app/products/_lib/types';
import { capitalizeString, cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { SimilarProducts } from '@/app/products/_components/similar_products';
import { SimilarItemSkeleton } from '@/app/products/_components/skeletons/similar_item_skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { SingleProductView } from './product_view';
import { Category } from '../_lib/types';
import { ProductReviews } from '../_components/reviews/product_reviews';

type PageProps = {
  params: { asin: string };
  searchParams: SearchParams;
};

export default async function SingleProductPage({ params, searchParams }: PageProps) {
  const { asin } = params;
  const category = (searchParams?.category as Category) || '';

  return (
    <main className='grid min-h-screen max-w-screen-xl mx-auto'>
      <Breadcrumb className='flex items-center col-span-full px-10 bg-muted h-14'>
        <BreadcrumbList>
          <BreadcrumbItem className='text-xs text-muted-foreground'>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className='text-xs text-muted-foreground'>
            <BreadcrumbLink href='/products'>Shop</BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem className='text-xs text-muted-foreground'>
                <BreadcrumbLink href={`/products?category=${category}`}>
                  {capitalizeString(category)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem className='text-xs'>
            <BreadcrumbPage>{asin}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SingleProductView asin={asin} searchParams={searchParams} />

      <Card className='rounded-none pt-8 pb-16 space-y-8'>
        <CardHeader>
          <CardTitle className='text-2xl font-medium'>Customers also viewed</CardTitle>
        </CardHeader>
        <CardContent className='px-6 pb-10 m-0'>
          <Suspense fallback={<SimilarItemSkeleton />}>
            <SimilarProducts asin={asin} category={category} />
          </Suspense>
        </CardContent>
      </Card>

      <Card id='reviews' className='rounded-none py-10 sm:px-4 xl:px-8'>
        <CardHeader>
          <h2 className='text-2xl font-medium'>Customer Reviews</h2>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <CardTitle className='text-xl font-medium'>No reviews yet</CardTitle>
            }>
            <ProductReviews asin={asin} searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
