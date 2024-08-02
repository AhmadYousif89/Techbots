import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import prisma from '@/lib/db';
import { capitalizeString, cn } from '@/lib/utils';

import { SearchParams } from '../_lib/types';
import { ProductDetails } from './product_details';
import { ProductReviews } from './product_reviews';
import { SimilarProducts } from './product_similar_items';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SimilarItemSkeleton } from '../_components/skeletons/similar_item_skeleton';

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const product = await prisma.product.findUnique({
    where: { asin: params.asin },
    select: { brand: true, title: true },
  });
  const category = capitalizeString(searchParams.cat ?? '', false);
  const prodTitle = product?.title.split(' ').slice(0, 5).join(' ') ?? '';
  const brand = capitalizeString(product?.brand ?? '', false);

  return {
    title: `${category} | ${prodTitle}`,
    description: `Shop the new ${prodTitle} from ${brand}. Enjoy the best features and quality at Techbots.`,
  };
};

type PageProps = {
  params: { asin: string };
  searchParams: SearchParams;
};

export default async function SingleProductPage({ params, searchParams }: PageProps) {
  const { asin } = params;
  const product = await prisma.product.findUnique({
    where: { asin },
    select: { category: true },
  });

  if (!product) {
    return notFound();
  }

  const category = product.category;

  return (
    <main className='grid min-h-screen max-view mx-auto'>
      <Breadcrumb className='flex items-center col-span-full px-4 lg:px-10 bg-muted h-14'>
        <BreadcrumbList>
          <BreadcrumbItem className='text-xs text-muted-foreground'>
            <BreadcrumbLink asChild>
              <Link href='/'>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className='text-xs text-muted-foreground'>
            <BreadcrumbLink asChild>
              <Link href='/products'>Shop</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem className='text-xs text-muted-foreground'>
                <BreadcrumbLink asChild>
                  <Link href={`/products?cat=${category}`}>
                    {capitalizeString(category)}
                  </Link>
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

      <ProductDetails asin={asin} searchParams={searchParams} />

      <Suspense fallback={<SimilarItemSkeleton />}>
        <SimilarProducts asin={asin} category={category} />
      </Suspense>

      <Suspense fallback={<h1>Loading reviews...</h1>}>
        <Card id='reviews' className='rounded-none py-10 sm:px-4 xl:px-8'>
          <CardHeader>
            <CardTitle className='text-2xl font-medium'>Customer’s Review</CardTitle>
          </CardHeader>
          <ProductReviews asin={asin} searchParams={searchParams} />
        </Card>
      </Suspense>
    </main>
  );
}
