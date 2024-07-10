import { Category, Product, SortValue } from '@/app/products/_actions/actions';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SearchParams } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeString(str: string) {
  return str[0].toUpperCase().concat(str.slice(1).replace('-', ' '));
}

export function getCartTotal(cart: Product[]) {
  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.cartQuantity || 1),
    0
  );
  return +total.toFixed(2);
}

export function getCartCount(cart: Product[]) {
  const count = cart.reduce((acc, item) => acc + (item.cartQuantity || 1), 0);
  return count;
}

export function extractSearchParams(
  searchParams: SearchParams | IterableIterator<[string, string]>,
  customLimit: string = '8'
) {
  let params: { [key: string]: any } = {};

  if (Symbol.iterator in Object(searchParams)) {
    for (const [key, value] of searchParams as IterableIterator<[string, string]>) {
      params[key] = value;
    }
  } else {
    params = searchParams;
  }
  const page = params['page'] ?? '1';
  const limit = params['limit'] ?? customLimit;
  const category = (params['category'] as Category) ?? '';
  const sort = (params['sort'] as SortValue) ?? '';
  const grid = params['grid'] ?? '';
  const selectedRating = params['filterByRating'] ?? '';
  const min = params['min'] ?? '';
  const max = params['max'] ?? '';

  return { page, limit, category, sort, grid, selectedRating, min, max };
}

export function convertPriceString(price: string) {
  let numericPrice = price.replace('$', '');
  numericPrice = numericPrice.replace(/,/g, '');
  return parseFloat(numericPrice);
}
