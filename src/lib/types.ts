import { Category } from '@/app/products/_actions/actions';

export type SearchParams = { [key: string]: string | Category | undefined };

type Cart = {
  id: number;
  user: User;
  userId: number;
  products: Product[];
  quantity: number;
  total: number;
  date: Date;
};

type User = {
  id: number;
  email: string;
  name?: string;
  password?: string;
  image?: string;
  Cart?: Cart;
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

type Product = {
  asin: string;
  title: string;
  brand: string;
  color: string | null;
  price: string;
  category: Category;
  description: string | null;
  rating: number;
  ratings_total: number;
  rating_breakdown: RatingBreakdown;
  main_image: ProductImage;
  images: ProductImage[];
  images_count: number;
  videos: ProductVideo[];
  videos_count: number | null;
  top_reviews: Review[];
  specifications_flat: string;
  feature_bullets_flat: string;
  cart_quantity: number;
  stock_quantity: number;
};

type ReviewImage = {
  link: string;
};

type Review = {
  id: string;
  title: string;
  body: string;
  asin: string;
  body_html: string;
  link: string;
  rating: number;
  date: ReviewDate;
  profile: ReviewProfile;
  vine_program: boolean;
  verified_purchase: boolean;
  images: ReviewImage[];
  review_country: string;
  is_global_review: boolean;
};

type ProductImage = {
  link: string;
  variant?: string;
};

type ProductVideo = {
  duration_seconds: number;
  width: number;
  height: number;
  link: string;
  thumbnail: string;
  is_hero_video: boolean;
  variant: string;
  group_id: string;
  group_type: string;
  title: string;
};
