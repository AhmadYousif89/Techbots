import { Metadata } from 'next';
import { Suspense } from 'react';

import prisma from '@/lib/db';
import { capitalizeString } from '@/lib/utils';

import { SearchParams } from '../_lib/types';
import { ProductDetails } from './product_details';
import { ProductReviews } from './product_reviews';
import { SimilarProducts } from './product_similar_items';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { BreadcrumbSkeleton } from '../_components/skeletons/breadcrumb';
import { BreadcrumbSection } from '../_components/product_breadcrumb';
import { SimilarItemSkeleton } from './skeletons/similar_items';
import { ProductDetailSkeleton } from './skeletons/main_view';
import { ReviewSkeleton } from './skeletons/reviews';

export const getProductCategory = async (asin: string) => {
  const product = await prisma.product.findUnique({
    where: { asin },
    select: { category: true },
  });

  return product?.category ?? '';
};

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

  return (
    <main className='grid min-h-screen max-view mx-auto'>
      <Suspense fallback={<BreadcrumbSkeleton />}>
        <BreadcrumbSection asin={asin} type='single' />
      </Suspense>

      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetails asin={asin} searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<SimilarItemSkeleton />}>
        <SimilarProducts asin={asin} />
      </Suspense>

      <Suspense fallback={<ReviewSkeleton />}>
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
