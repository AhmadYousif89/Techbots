import Link from "next/link";
import { TProduct } from "@/app/lib/types";
import { capitalizeString } from "@/app/lib/utils";

import { ArrowRightSquare } from "lucide-react";
import { ProductCarousel } from "./product_carousel";
import { RatingStars } from "./reviews/rating_stars";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getThumbnailImages } from "@/app/lib/getThumbnailImages";

type ProductQuickViewProps = {
  product: TProduct;
};

export async function ProductQuickView({ product }: ProductQuickViewProps) {
  const getBlobImages = getThumbnailImages();

  return (
    <div className="max-h-[600px] overflow-y-auto lg:max-h-[700px]">
      <section className="grid gap-4 md:grid-cols-2">
        <ProductCarousel product={product} blobImages={getBlobImages} />

        <div className="self-center p-4 pb-8 lg:p-8">
          <div className="mb-6 flex items-center justify-between gap-4 *:text-muted-foreground">
            <Badge variant="outline" className="w-fit">
              {capitalizeString(product.category)}
            </Badge>
            <Badge variant={"outline"} className="shadow-sm">
              {product.color || "Color n/a"}
            </Badge>
          </div>
          <div className="mb-6 space-y-6">
            <p className="font-medium text-muted-foreground max-md:text-sm">
              {product.title}
            </p>

            <RatingStars
              className="pointer-events-none"
              productRating={product.rating}
              reviewsCount={product.ratingsTotal.toLocaleString()}
            />
          </div>

          <Button variant={"outline"} className="text-muted-foreground">
            <Link
              href={`/products/${product.asin}`}
              className="flex items-center gap-2"
            >
              Product Details
              <ArrowRightSquare className="size-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
