import Link from "next/link";
import Image from "next/image";
import prisma from "@/app/lib/db";
import { cache } from "@/app/lib/cache";
import { auth } from "@clerk/nextjs/server";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CartIndicator } from "./item_indicators/cart_indicator";
import { WishlistIndicator } from "./item_indicators/wishlist_indicator";
import { RatingStars } from "../_components/reviews/rating_stars";
import { TItemInServerCart, getProductCategory } from "./page";

const getSimilarProducts = cache(
  async (asin: string) => {
    const category = await getProductCategory(asin);

    return await prisma.product.findMany({
      where: { asin: { not: asin }, category },
      orderBy: { rating: "desc" },
      take: 8,
    });
  },
  ["getSimilarProducts"],
);

type SimilarProductsProps = {
  asin: string;
  checkItemInServerCart: (
    asin: string,
    cuid: string | null,
  ) => Promise<TItemInServerCart>;
};

export async function SimilarProducts({
  asin,
  checkItemInServerCart,
}: SimilarProductsProps) {
  const { userId } = auth();
  const products = await getSimilarProducts(asin);

  return (
    <section className="bg-background py-10 sm:px-4 xl:px-8">
      <CardHeader className="pb-8 pt-0">
        <div className="flex items-center gap-8">
          <h2 className="text-2xl font-medium">Related products</h2>
          <Link
            className="text-sm text-muted-foreground hover:underline hover:underline-offset-4"
            href={`/products?category=${products[0].category}`}
          >
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="mb-6 p-6">
        <Carousel
          className="mx-auto max-w-[80vw] xl:max-w-screen-lg"
          opts={{ dragFree: true, skipSnaps: true, align: "start" }}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="grid basis-44 pb-4">
                <Card className="relative gap-2 p-2 py-4">
                  <div className="absolute left-0 top-2 flex w-full items-center justify-between px-2">
                    <CartIndicator
                      asin={product.asin}
                      checkItemInServerCart={checkItemInServerCart(
                        product.asin,
                        userId,
                      )}
                    />
                    <div className="ml-auto">
                      <WishlistIndicator asin={product.asin} />
                    </div>
                  </div>
                  <Link
                    href={`/products/${product.asin}`}
                    className="flex flex-col justify-between"
                  >
                    <Image
                      src={product.mainImage}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="size-32 object-contain p-4"
                    />
                    <CardContent className="mt-auto px-0 py-0">
                      <p className="mb-1 text-xs font-medium">
                        {product.title.split(" ").slice(0, 3).join(" ")}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          ${product.price.toFixed(2)}
                        </p>
                        <RatingStars
                          productRating={product.rating}
                          showTotalReviews={false}
                          size="xs"
                        />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 top-full translate-y-1/2" />
          <CarouselNext className="right-0 top-full translate-y-1/2" />
        </Carousel>
      </CardContent>
    </section>
  );
}
