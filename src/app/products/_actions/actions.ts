import { Product } from '@prisma/client';

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
  ''
] as const;
export type Category = (typeof categories)[number];
export type SortValue = 'popular' | 'newest' | 'lowest-price' | 'highest-price' | '';
export type TProduct = Product & { cartQuantity?: number; category: Category };
