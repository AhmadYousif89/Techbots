import { OrderItem, Product, ProductImages, Review } from "@prisma/client";

export type SearchParams = { [key: string]: string | string | undefined };
export type SortValue =
  | "popular"
  | "newest"
  | "lowest-price"
  | "highest-price"
  | "reset"
  | "";
export type TProduct = Product & {
  category: string;
  cartQuantity: number;
  topReviews: Review[];
  images: ProductImages[];
  orderItems: OrderItem[];
};
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
