import { TProduct } from "@/app/lib/types";
import { ProductDetails } from "../[asin]/product_details";

type ProductQuickViewProps = {
  asin: string;
};

export function ProductQuickView({ asin }: ProductQuickViewProps) {
  return (
    <div className="max-h-[600px] overflow-y-auto lg:max-h-[700px]">
      <ProductDetails className="p-0" topOffset="top-0" asin={asin} />
    </div>
  );
}
