import { Metadata } from "next";
import { Suspense } from "react";

import prisma from "@/app/lib/db";
import { SearchParams, TProduct } from "@/app/lib/types";
import { capitalizeString } from "@/app/lib/utils";

import { ProductDetails } from "./product_details";
import { ProductReviews } from "./product_reviews";
import { SimilarProducts } from "./product_similar_items";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSkeleton } from "../_components/skeletons/breadcrumb";
import { BreadcrumbSection } from "../_components/product_breadcrumb";
import { SimilarItemSkeleton } from "./skeletons/similar_items";
import { ProductDetailSkeleton } from "./skeletons/product_view";
import { ReviewSkeleton } from "./skeletons/reviews";
import { Separator } from "@/components/ui/separator";
import { getSearchParams } from "@/app/lib/getSearchParams";

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const product = await prisma.product.findUnique({
    where: { asin: params.asin },
    select: { brand: true, title: true },
  });
  const category = capitalizeString(searchParams.cat ?? "", false);
  const prodTitle = product?.title.split(" ").slice(0, 5).join(" ") ?? "";
  const brand = capitalizeString(product?.brand ?? "", false);

  return {
    title: `${category} | ${prodTitle}`,
    description: `Shop the new ${prodTitle} from ${brand}. Enjoy the best features and quality at Techbots.`,
  };
};

export const getProductDetails = async (asin: string, limit = 8) => {
  const { page, selectedRating } = getSearchParams();
  const limitPerPage = limit;
  const start = (+page <= 0 ? 0 : +page - 1) * limitPerPage;
  let product = {} as TProduct;

  try {
    product = (await prisma.product.findUnique({
      where: { asin },
      include: {
        images: true,
        topReviews: {
          where: { asin, rating: selectedRating ? +selectedRating : undefined },
          orderBy: { date: "desc" },
          take: limitPerPage,
          skip: start,
        },
      },
    })) as TProduct;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }

  const reviewsCount = await prisma.review.count({
    where: { asin, rating: selectedRating ? +selectedRating : undefined },
  });

  return { product, reviewsCount };
};

export const checkItemInServerCart = async (
  asin: string,
  cuid: string | null,
) => {
  if (!cuid) return null;
  const item = await prisma.cartItem.findUnique({
    where: {
      cartItemId: {
        cartId: cuid,
        productAsin: asin,
      },
    },
    select: { quantity: true },
  });

  return item;
};

export type TItemInServerCart = Awaited<
  ReturnType<typeof checkItemInServerCart>
>;

export const getProductCategory = async (asin: string) => {
  const product = await prisma.product.findUnique({
    where: { asin },
    select: { category: true },
  });

  return product?.category ?? "";
};

type PageProps = {
  params: { asin: string };
  searchParams: SearchParams;
};

export default function SingleProductPage({ params }: PageProps) {
  const { asin } = params;

  return (
    <main className="max-view mx-auto grid min-h-screen">
      <Suspense fallback={<BreadcrumbSkeleton />}>
        <BreadcrumbSection asin={asin} type="single" />
      </Suspense>

      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetails
          asin={asin}
          checkItemInServerCart={checkItemInServerCart}
        />
      </Suspense>

      <Separator />
      <Suspense fallback={<SimilarItemSkeleton />}>
        <SimilarProducts
          asin={asin}
          checkItemInServerCart={checkItemInServerCart}
        />
      </Suspense>

      <Suspense fallback={<ReviewSkeleton />}>
        <Card className="rounded-none py-10 sm:px-4 xl:px-8">
          <CardHeader>
            <CardTitle className="text-2xl font-medium">
              Customer’s Review
            </CardTitle>
          </CardHeader>
          <ProductReviews asin={asin} />
        </Card>
      </Suspense>
    </main>
  );
}
