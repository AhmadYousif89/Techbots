import { Category } from './store';

type RatingBreakdown = {
  percentage: number;
  count: number;
};

type ReviewDate = {
  raw: string;
  utc: string;
};

type ReviewProfile = {
  name: string;
  link: string;
  id: string;
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

type RatingBreakdownDetails = {
  five_star: RatingBreakdown;
  four_star: RatingBreakdown;
  three_star: RatingBreakdown;
  two_star: RatingBreakdown;
  one_star: RatingBreakdown;
};

export type Product = {
  title: string;
  asin: string;
  brand: string;
  color: string;
  price: string;
  category: Category;
  description: string | null;
  rating: number;
  ratings_total: number;
  rating_breakdown: RatingBreakdownDetails;
  main_image: ProductImage;
  images: ProductImage[];
  images_count: number;
  videos: ProductVideo[] | null;
  videos_count: number | null;
  top_reviews: Review[];
  specifications_flat: string;
  feature_bullets_flat: string;
  is_stock: boolean;
  cart_quantity: number;
  stock_quantity: number;
};
