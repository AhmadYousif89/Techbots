import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { extractSearchParams } from "@/app/lib/utils";
import { TProduct, SearchParams } from "@/app/lib/types";

import { checkItemInServerCart } from "../[asin]/page";
import { RatingStars } from "./reviews/rating_stars";
import { Separator } from "@/components/ui/separator";
import { AddToCartButton } from "@/app/components/cart/add_button";
import { AddToWishlistButton } from "@/app/components/wishlist/add_button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductQuickView } from "./product_quick_view";

type Props = {
  product: TProduct;
  searchParams: SearchParams;
};

export async function ProductGridItem({ product, searchParams }: Props) {
  const { userId } = auth();
  const { asin, rating, mainImage, title, price } = product;
  const { grid } = extractSearchParams(searchParams);
  const prodUrl = `/products/${asin}`;

  return (
    <Card className="group/item relative grid max-w-xs auto-rows-[150px_3px_1fr_3px_auto] justify-self-center overflow-hidden rounded border-0 px-4 py-2 shadow-none ring-offset-4 hover:ring-1 hover:ring-muted md:auto-rows-[200px_3px_1fr_3px_auto]">
      <button className="absolute left-0 top-0 flex h-8 w-full translate-y-0 select-none items-center justify-center gap-2 rounded bg-muted transition-transform duration-200 active:bg-input group-hover/item:visible group-hover/item:-translate-y-0 group-hover/item:opacity-100 lg:-translate-y-16">
        <EyeIcon className="size-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">
          Quick view
        </span>
      </button>
      <Dialog>
        <DialogTrigger asChild>
          <button className="absolute left-0 top-0 flex h-8 w-full translate-y-0 select-none items-center justify-center gap-2 rounded bg-muted transition-transform duration-200 active:bg-input group-hover/item:visible group-hover/item:-translate-y-0 group-hover/item:opacity-100 lg:-translate-y-16">
            <EyeIcon className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Quick view
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[1200px] p-0">
          <ProductQuickView product={product} />
        </DialogContent>
      </Dialog>
      <div className="grid size-full max-h-[120px] self-end sm:max-h-[170px]">
        <Image
          src={mainImage}
          alt={title}
          width={150}
          height={150}
          className={cn(
            "size-24 place-self-center object-contain",
            grid === "3" && "p-0 lg:size-36",
            grid === "2" && "p-2 lg:size-44",
          )}
        />
      </div>
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
          checkItemInServerCart={checkItemInServerCart(asin, userId)}
        />
        <AddToWishlistButton logoSize={18} product={product} />
      </CardFooter>
    </Card>
  );
}
