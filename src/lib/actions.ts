import fs from 'fs';
import path from 'path';
import { Product } from './types';
import type { Category } from './store';

export async function getLocalProducts() {
  const filePath = path.join(process.cwd(), 'data', 'all_products.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(fileData);

  return products as Product[];
}

export async function getProductByAsin(asin: string) {
  const products = await getLocalProducts();
  await new Promise(res => setTimeout(res, 2000));
  return products.find(product => product.asin === asin);
}

export async function getProductsByCategory(category: Category) {
  const products = await getLocalProducts();
  const result = products.filter(product => product.category === category);
  return result;
}

export async function getColorList() {
  const products = await getLocalProducts();
  return products.reduce((acc, product) => {
    if (product.color && !acc.includes(product.color)) {
      acc.push(product.color);
    }
    return acc;
  }, [] as string[]);
}

export async function getProductsByColor(color: string) {
  const products = await getLocalProducts();
  return products.filter(product => product.color === color);
}

export async function getSimilarProducts(category: Category, asin: string) {
  const products = await getProductsByCategory(category);
  return products.filter(product => product.asin !== asin);
}

export async function filterAndPaginateProducts(searchParams: {
  [key: string]: string | undefined;
}) {
  let products = await getLocalProducts();
  let totalProducts = products.length;

  // Handle products filtering
  let productsByCategory: Product[] = [];
  let category = searchParams['category'] ?? '';
  if (category) {
    productsByCategory = await getProductsByCategory(category as Category);
    products = productsByCategory;
    totalProducts = products.length;
  }
  // Handle products pagination
  const page = searchParams['page'] ?? '1';
  const limitPerPage = searchParams['limit'] ?? '8';
  const gridSize = searchParams['grid'] ?? '';
  const totalPages = Math.ceil(totalProducts / +limitPerPage);
  const start = (+page - 1) * +limitPerPage;
  const end = start + +limitPerPage;
  const hasPrevPage = start > 0;
  const hasNextPage = end < totalProducts;
  const paginatedProducts = products.slice(start, end);

  return {
    category,
    start,
    end,
    totalProducts,
    paginatedProducts,
    hasPrevPage,
    hasNextPage,
    totalPages,
    limitPerPage,
    gridSize,
    page
  };
}
