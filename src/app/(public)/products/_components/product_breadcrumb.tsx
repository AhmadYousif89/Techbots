import Link from "next/link";
import { capitalizeString } from "@/app/lib/utils";
import { getProductCategory } from "../[asin]/page";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbSectionProps = {
  asin?: string;
  type?: "single" | "";
  category?: string;
};

export async function BreadcrumbSection({
  asin,
  type = "",
  category = "",
}: BreadcrumbSectionProps) {
  if (type === "single") {
    const category = asin ? await getProductCategory(asin) : "";

    return (
      <Breadcrumb className="col-span-full flex h-14 items-center bg-muted px-4 lg:px-10">
        <BreadcrumbList>
          <BreadcrumbItem className="text-xs text-muted-foreground underline-offset-4 hover:underline">
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-xs text-muted-foreground underline-offset-4 hover:underline">
            <BreadcrumbLink asChild>
              <Link href="/products">Shop</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="text-xs text-muted-foreground underline-offset-4 hover:underline">
                <BreadcrumbLink asChild>
                  <Link href={`/products?cat=${category}`}>
                    {capitalizeString(category)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-xs">
            <BreadcrumbPage>{asin}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-xs underline-offset-4 hover:underline">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-xs underline-offset-4 hover:underline">
          <BreadcrumbLink asChild>
            <Link href="/products">Shop</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {category && !category.includes(",") && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs font-semibold text-muted-foreground">
                {capitalizeString(category)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
