import type { OrderItem, Product, ProductImages, Review } from "@prisma/client";

export type SearchParams = { [key: string]: string | string[] | undefined };
export type SortValue =
  | "popular"
  | "newest"
  | "lowest-price"
  | "highest-price"
  | "reset"
  | "";
type ProductBase = Omit<Product, "price"> & {
  price: number;
};

type ProductRelations = {
  images: ProductImages[];
  topReviews: Review[];
  orderItems: OrderItem[];
};

export type TProduct = ProductBase &
  ProductRelations & {
    cartQuantity?: number;
  };

export type TProductRecord = Product & ProductRelations;
export type RatingDetails = {
  percentage: number;
  count: number;
};
export type RatingBreakdown = {
  five_star: RatingDetails;
  four_star: RatingDetails;
  three_star: RatingDetails;
  two_star: RatingDetails;
  one_star: RatingDetails;
};
export type ReviewDate = {
  raw: string;
  utc: string;
};
export type ReviewProfile = {
  id: string;
  name: string | null;
  link: string;
};
