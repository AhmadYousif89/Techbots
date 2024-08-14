import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { capitalizeString, cn } from "@/app/lib/utils";

import { TProduct } from "../_lib/types";
import { extractSearchParams } from "../_lib/utils";
import { SearchParams } from "@/app/products/_lib/types";
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
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductInteractionButtons } from "./interaction_buttons";

export const getProductDetails = async (
  asin: string,
  searchParams: SearchParams,
  limit = 8,
) => {
  const { page, selectedRating } = extractSearchParams(searchParams);
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

export const getServerCartItem = async (asin: string) => {
  "use server";
  return prisma.cartItem.findFirst({
    where: { productAsin: asin },
    select: { cartId: true, quantity: true },
  });
};

type ProductDetailsProps = {
  asin: string;
  searchParams: SearchParams;
};

export async function ProductDetails({
  asin,
  searchParams,
}: ProductDetailsProps) {
  const { product } = await getProductDetails(asin, searchParams);

  if (!product) {
    return notFound();
  }

  const productSpecs = parseProductDetails(product.specificationsFlat);
  const productFeatures = parseProductDetails(product.featureBulletsFlat);

  return (
    <Card className="grid items-center rounded-none pb-10 lg:grid-cols-2 lg:gap-10">
      <div className="self-start lg:sticky lg:top-20 lg:p-8">
        <ProductCarousel {...product} />
      </div>

      <div className="self-start pt-4 lg:pt-8">
        <CardHeader className="max-w-prose gap-4">
          <Badge variant="outline" className="w-fit">
            {capitalizeString(product.category)}
          </Badge>
          <div className="space-y-6">
            <CardTitle className="text-balance text-sm font-medium lg:text-lg">
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
        <CardContent className="max-w-prose">
          {product.description && (
            <CardDescription className="mb-4 border-b pb-2">
              {product.description}
            </CardDescription>
          )}
          <div className="flex flex-col gap-8 pb-4">
            <ProductInteractionButtons
              product={product}
              getServerCartItem={getServerCartItem(product.asin)}
            />
          </div>
        </CardContent>
        <CardFooter className="max-w-prose flex-col items-stretch">
          {productFeatures && (
            <ProductDetailsTable type="feats" data={productFeatures} />
          )}
          {productSpecs && (
            <ProductDetailsTable type="specs" data={productSpecs} />
          )}
          {!productFeatures && !productSpecs && (
            <span>
              {product.title} Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Facilis ipsam quas optio itaque, quo aperiam
              autem rerum ratione sunt. Voluptates distinctio animi veniam,
              libero aliquid harum quisquam ullam beatae iusto accusantium
              magnam laudantium officiis aperiam, asperiores incidunt in
              aspernatur rem. Qui temporibus libero eum iure ratione quia,
              corporis eius voluptatum.
            </span>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}

type ProductDetailsTableProps = {
  data: Record<string, string>;
  type: "specs" | "feats";
};

const ProductDetailsTable = ({ data, type }: ProductDetailsTableProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="details"
        className={cn(type == "specs" ? "border-b-0" : "")}
      >
        <AccordionTrigger
          className={cn(
            `text-xs uppercase text-muted-foreground hover:text-foreground/50`,
            type == "feats" && "sm:pt-0",
          )}
        >
          {type === "specs" ? "Specifications" : "Features"}
        </AccordionTrigger>
        <AccordionContent>
          <table className="bg-secondary text-xs">
            <thead className="bg-primary text-secondary">
              <tr>
                <th className="w-1/4 p-2">Attribute</th>
                <th className="w-3/4 p-2">Value</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

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
