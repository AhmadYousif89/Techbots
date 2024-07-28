import { OrderItem, Product, ProductImages, Review } from '@prisma/client';

export const categories = [
  'gaming-laptops',
  'laptops',
  'accessories',
  'cpu',
  'computers',
  'gpu',
  'monitors',
  'headphones',
  'powerbanks',
  'mobiles',
  'routers',
  'watches',
] as const;

export type Category = (typeof categories)[number] | '';
export type SearchParams = { [key: string]: string | Category | undefined };
export type SortValue =
  | 'popular'
  | 'newest'
  | 'lowest-price'
  | 'highest-price'
  | 'reset'
  | '';
export type TProduct = Product & {
  category: Category;
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
