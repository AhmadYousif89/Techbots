import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";

import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { RatingStars } from "./products/_components/reviews/rating_stars";
import { Category } from "./products/_lib/types";
import { cache } from "@/lib/cache";

const day = 60 * 60 * 24;

const getPopularItems = cache(
  async () => {
    const categories: Category[] = [
      "laptops",
      "mobiles",
      "headphones",
      "watches",
      "accessories",
    ];
    const allProducts = await prisma.product.findMany({
      where: { category: { in: categories } },
    });

    return categories.flatMap((category) => {
      return allProducts
        .filter((product) => product.category === category)
        .slice(0, 2);
    });
  },
  ["/", "getPopularItems"],
  { revalidate: day },
);

export async function PopularItemsSlide() {
  const products = await getPopularItems();

  return (
    <section className="bg-secondary px-6 py-10">
      <div className="mb-12 flex items-center gap-4">
        <h2 className="text-xl font-bold lg:text-2xl">Popular Items</h2>
        <Button variant={"link"} className="hover:text-muted-foreground">
          <Link href="/products?sort=popular">View All</Link>
        </Button>
      </div>
      <Carousel
        className="max-w-80vw ml-4 xl:mx-auto xl:max-w-screen-lg"
        opts={{ dragFree: true, align: "start" }}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="grid basis-48 pb-4">
              <Card className="grid auto-rows-[1fr_auto] gap-4 p-4">
                <Link
                  href={`/products/${product.asin}`}
                  className="grid place-content-center"
                >
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    width={150}
                    height={150}
                  />
                </Link>
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
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 top-full -translate-y-2" />
        <CarouselNext className="right-0 top-full -translate-y-2" />
      </Carousel>
    </section>
  );
}
