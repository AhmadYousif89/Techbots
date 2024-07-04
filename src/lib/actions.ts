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
  return products.find(product => product.asin === asin);
}

export async function getProductsByCategory(category: Category) {
  const products = await getLocalProducts();
  const result = products.filter(product => product.category === category);
  return result;
}

export function getColorList(products: Product[]) {
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
