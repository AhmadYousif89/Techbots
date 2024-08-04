import Link from "next/link";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { extractSearchParams } from "../_lib/utils";
import { TProduct, SearchParams } from "../_lib/types";

import { RatingStars } from "./reviews/rating_stars";
import { AddToCartButton } from "../../../components/cart_menu/add_button";
import { Separator } from "@/components/ui/separator";
import { AddToWishlistButton } from "@/components/wishlist_menu/add_button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  product: TProduct;
  searchParams: SearchParams;
};

export async function ProductGridItem({ product, searchParams }: Props) {
  const { asin, rating, mainImage, title, price } = product;
  const { grid } = extractSearchParams(searchParams);
  const prodUrl = `/products/${asin}`;

  return (
    <Card className="grid max-w-xs auto-rows-[150px_3px_1fr_3px_auto] justify-self-center rounded border-0 px-4 py-2 shadow-none ring-offset-4 hover:ring-1 hover:ring-muted md:auto-rows-[200px_3px_1fr_3px_auto]">
      <Link href={prodUrl} className="place-self-center rounded">
        <Image
          src={mainImage}
          alt={title}
          width={150}
          height={150}
          className={cn(
            "size-28 object-contain",
            grid === "3" && "p-0 lg:size-36",
            grid === "2" && "p-2 lg:size-44",
          )}
        />
      </Link>
      <Separator />
      <CardHeader className="justify-center space-y-0 p-0 py-4">
        <Link href={prodUrl}>
          <CardTitle
            className={cn(
              "text-xs font-medium hover:text-blue-700 hover:underline",
              grid === "2" && "text-sm",
            )}
          >
            {title}
          </CardTitle>
        </Link>
        <div className="mt-auto flex w-full flex-1 items-end justify-between self-end pt-4 font-medium text-muted-foreground md:text-sm">
          <RatingStars
            productRating={rating}
            showTotalReviews={false}
            size="xs"
          />
          <span className="place-self-end text-xs">${price.toFixed(2)}</span>
        </div>
      </CardHeader>
      <Separator />
      <CardFooter className="justify-between gap-4 p-0 pt-2">
        <AddToCartButton
          size={"sm"}
          action="BuyNow"
          product={product}
          forceRedirect={true}
        />
        <AddToWishlistButton logoSize={18} product={product} />
      </CardFooter>
    </Card>
  );
}
