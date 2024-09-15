import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { cn } from "@/lib/utils";
import { SearchParams } from "@/app/lib/types";
import { capitalizeString } from "@/app/lib/utils";
import { getBase64Images } from "@/app/lib/convertBase64Images";
import { RatingStars } from "../_components/reviews/rating_stars";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCarousel } from "../_components/product_carousel";
import { AddToCartButton } from "@/app/components/cart/add_button";
import { AddToWishlistButton } from "@/app/components/wishlist/add_button";
import { TItemInServerCart, getProductDetails } from "./page";
import { ProductDetailsTable } from "./product_feats_specs";
import { ViewInCartButton } from "./in_cart_buttons";

function parseProductDetails(data: string | null) {
  const obj: { [key: string]: string } = {};
  if (!data) return obj;
  const parts = data.split(". ");

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    // Check if this part contains a colon and is not the last part
    if (part.includes(":") && i < parts.length - 1) {
      const item = part.split(":").map((item) => item.trim());
      let key = item[0];
      const value = item[1];
      // Remove brackets from keys if present
      if (key.startsWith("[") && key.endsWith("]")) {
        key = key.slice(1, -1);
      }

      obj[key] = value;
    }
  }

  return obj;
}

type ProductDetailsProps = PropsWithChildren<{
  asin: string;
  className?: string;
  searchParams?: SearchParams;
  checkItemInServerCart?: (
    asin: string,
    cuid: string | null,
  ) => Promise<TItemInServerCart>;
}>;

export async function ProductDetails({
  asin,
  className,
  searchParams,
  checkItemInServerCart,
}: ProductDetailsProps) {
  const { userId } = auth();
  const { product } = await getProductDetails(asin, searchParams);
  const getBlobImages = getBase64Images();

  if (!product) {
    return notFound();
  }

  const productSpecs = parseProductDetails(product.specificationsFlat);
  const productFeatures = parseProductDetails(product.featureBulletsFlat);

  return (
    <section
      className={cn(
        "group/details grid bg-background pb-10 lg:grid-cols-2 lg:gap-10",
        className,
      )}
    >
      {/* add sticky only if one of the Card's childrens has aria-expanded e.g. one of the Accordions */}
      <div className="top-20 self-start lg:group-has-[[aria-expanded='true']]/details:sticky">
        <ProductCarousel product={product} blobImages={getBlobImages} />
      </div>

      <div className="lg:pt-8">
        <CardHeader className="gap-4">
          <Badge variant="outline" className="w-fit">
            {capitalizeString(product.category)}
          </Badge>
          <div className="space-y-6">
            <CardTitle className="text-base font-medium text-muted-foreground">
              {product.title}
            </CardTitle>
            <RatingStars
              productRating={product.rating}
              reviewsCount={product.ratingsTotal.toLocaleString()}
            />
            <div className="flex items-center justify-between gap-4">
              <Badge
                variant={product.stockQuantity > 0 ? "outline" : "destructive"}
                className={cn(
                  product.stockQuantity > 0
                    ? "border-0 bg-emerald-500 text-secondary"
                    : "",
                )}
              >
                {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
              {product.color && (
                <div className="ml-2 flex items-center text-sm font-medium text-muted-foreground">
                  Color :{" "}
                  <Badge
                    variant={"outline"}
                    className="ml-4 text-muted-foreground shadow-sm"
                  >
                    {product.color}
                  </Badge>
                </div>
              )}
            </div>
            <Separator />
          </div>
        </CardHeader>
        <CardContent>
          {product.description && (
            <CardDescription className="mb-4 border-b pb-6">
              {product.description}
            </CardDescription>
          )}
          <div className="flex flex-col gap-8 pb-4">
            <div className="group/actions flex items-center justify-between gap-4">
              <div className="flex items-center justify-center gap-4 max-[370px]:flex-col max-[370px]:gap-2">
                <Badge
                  variant={"outline"}
                  className="py-1 text-muted-foreground shadow-sm sm:text-sm"
                >
                  $ {product.price.toFixed(2)}
                </Badge>
                <ViewInCartButton
                  asin={product.asin}
                  checkItemInServerCart={checkItemInServerCart?.(
                    product.asin,
                    userId,
                  )}
                />
              </div>
              <div className="flex items-center gap-4 lg:gap-8">
                <AddToCartButton
                  action="addToCart"
                  product={product}
                  checkItemInServerCart={checkItemInServerCart?.(
                    product.asin,
                    userId,
                  )}
                />
                <AddToWishlistButton logoSize={20} product={product} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch">
          {productFeatures && (
            <ProductDetailsTable type="feats" data={productFeatures} />
          )}
          {productSpecs && (
            <ProductDetailsTable type="specs" data={productSpecs} />
          )}
        </CardFooter>
      </div>
    </section>
  );
}
