import prisma from '@/lib/db';
import { SearchParams } from '@/lib/types';
import { extractSearchParams } from '@/lib/utils';

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

export async function getProducts() {
  const products = await prisma.product.findMany({
    include: { top_reviews: true, images: true },
    orderBy: { title: 'asc' }
  });

  return products;
}

export type Product = Awaited<ReturnType<typeof getProducts>>[number] & {
  cartQuantity?: number;
  category: Category;
};

export async function getProductByAsin(asin: string, searchParams: SearchParams) {
  const product = (await prisma.product.findUnique({
    where: { asin },
    include: {
      images: true
    }
  })) as Product;

  if (!product) {
    throw new Error(`Product with ASIN ${asin} not found`);
  }

  return product;
}

export async function getProductsByCategory(category: Category) {
  const products = await prisma.product.findMany({
    where: { category }
  });

  return products as Product[];
}

export async function getColorList() {
  const products = await getProducts();
  const colors = products.map(product => product.color);
  return [...new Set(colors.filter(Boolean))];
}

export async function searchProducts() {
  const products = (await getProducts()) as Product[];
  const results = products.map(product => {
    return {
      asin: product.asin,
      image: product.mainImage,
      title: product.title,
      category: product.category
    };
  });
  return results;
}

export async function getProductsByColor(color: string) {
  const products = await getProducts();
  return products.filter(product => product.color === color);
}

export async function getSimilarProducts(category: Category, asin: string) {
  const products = await getProductsByCategory(category);
  return products.filter(product => product.asin !== asin);
}

type FilterProductsProps = {
  searchParams: SearchParams;
};

export async function getFilteredProducts({ searchParams }: FilterProductsProps) {
  const { page, limit, category, sort } = extractSearchParams(searchParams);
  const start = (+page - 1) * +limit;
  const end = start + +limit;

  const sortOptions: { [key: string]: any } = {
    popular: { rating: 'desc' },
    newest: { createdAt: 'desc' },
    'lowest-price': { price: 'asc' },
    'highest-price': { price: 'desc' }
  };

  let products = await prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: sortOptions[sort] ?? { brand: 'asc' },
    take: +limit,
    skip: start
  });

  const totalCount = await prisma.product.count();
  const totalPages = Math.ceil(totalCount / +limit);
  const hasNextPage = end < totalCount;
  const hasPrevPage = start > 0;

  return {
    end,
    start,
    category,
    totalCount,
    products: products as Product[],
    hasPrevPage,
    hasNextPage,
    totalPages,
    limit,
    page
  };
}
