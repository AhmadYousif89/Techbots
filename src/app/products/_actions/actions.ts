import prisma from '@/lib/db';
import { SearchParams } from '@/lib/types';
import { extractSearchParams } from '@/lib/utils';

export const categories = [
  'laptops',
  'computers',
  'cpu',
  'gaming-laptops',
  'accessories',
  'gpu',
  'headphones',
  'powerbanks',
  'monitors',
  'mobiles',
  'routers',
  'watches'
] as const;
export type Category = (typeof categories)[number];
export type SortValue = 'popular' | 'newest' | 'lowest-price' | 'highest-price';

export async function getProducts() {
  const data = await prisma.product.findMany({
    include: { top_reviews: true, images: true },
    orderBy: { title: 'asc' }
  });

  return data;
}

export type Product = Awaited<ReturnType<typeof getProducts>>[number] & {
  cartQuantity?: number;
  category: Category;
};

export async function getProductByAsin(asin: string, searchParams: SearchParams) {
  const product = (await prisma.product.findUnique({
    where: { asin },
    include: { top_reviews: true, images: true }
  })) as Product;

  const { page, limit, selectedRating } = extractSearchParams(searchParams, '5');

  const reviews = product?.top_reviews ?? [];
  const start = (+page - 1) * +limit;
  const end = start + +limit;
  let filteredReviews =
    reviews && selectedRating
      ? reviews.filter(review => review.rating === +selectedRating)
      : reviews;
  const totalPages = Math.ceil(filteredReviews.length / +limit);
  const hasPrevPage = start > 0;
  const hasNextPage = end < filteredReviews.length;
  filteredReviews = filteredReviews.slice(start, end);

  return {
    product,
    filteredReviews,
    selectedRating,
    page,
    limit,
    start,
    end,
    totalPages,
    hasPrevPage,
    hasNextPage
  };
}

export async function getProductsByCategory(category: Category) {
  const data = await prisma.product.findMany({
    where: { category }
  });

  return data as Product[];
}

export async function getColorList() {
  const products = await getProducts();
  const colors = products.map(product => product.color);
  return [...new Set(colors.filter(Boolean))];
}

export async function searchProducts() {
  const products = (await getProducts()) as Product[];
  const data = products.map(product => {
    return {
      asin: product.asin,
      image: product.mainImage,
      title: product.title,
      category: product.category
    };
  });
  return data;
}

export async function getProductsByColor(color: string) {
  const products = await getProducts();
  return products.filter(product => product.color === color);
}

export async function getSimilarProducts(category: Category, asin: string) {
  const products = await getProductsByCategory(category);
  return products.filter(product => product.asin !== asin);
}

export async function getFilteredProducts(searchParams: {
  [key: string]: string | Category | undefined;
}) {
  const { page, limit, category, sort } = extractSearchParams(searchParams);

  let products = (await getProducts()) as Product[];
  let totalProducts = products.length;

  if (category) {
    products = await getProductsByCategory(category);
    totalProducts = products.length;
  }
  if (sort === 'popular') {
    products = (await prisma.product.findMany({
      orderBy: { rating: 'desc' }
    })) as Product[];
  } else if (sort === 'newest') {
    products = (await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })) as Product[];
  } else if (sort === 'lowest-price') {
    products = (await prisma.product.findMany({
      orderBy: { price: 'asc' }
    })) as Product[];
  } else if (sort === 'highest-price') {
    products = (await prisma.product.findMany({
      orderBy: { price: 'desc' }
    })) as Product[];
  }
  // Handle products pagination
  const totalPages = Math.ceil(totalProducts / +limit);
  const start = (+page - 1) * +limit;
  const end = start + +limit;
  const hasPrevPage = start > 0;
  const hasNextPage = end < totalProducts;
  const paginatedProducts = products.slice(start, end) as Product[];

  return {
    category,
    start,
    end,
    totalProducts,
    paginatedProducts,
    hasPrevPage,
    hasNextPage,
    totalPages,
    limit,
    page
  };
}
