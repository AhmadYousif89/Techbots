import { Category, TProduct, SortValue } from '@/app/products/_actions/actions';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SearchParams } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeString(str: string) {
  if (!str) return '';
  return str[0].toUpperCase().concat(str.slice(1).replace('-', ' '));
}

export function getCartTotal(cart: TProduct[]) {
  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.cartQuantity || 1),
    0
  );
  return +total.toFixed(2);
}

export function getCartCount(cart: TProduct[]) {
  const count = cart.reduce((acc, item) => acc + (item.cartQuantity || 1), 0);
  return count;
}

export function extractSearchParams(
  searchParams: SearchParams | IterableIterator<[string, string]>,
  customLimit = '8'
) {
  let params: { [key: string]: any } = {};

  if (Symbol.iterator in Object(searchParams)) {
    for (const [key, value] of searchParams as IterableIterator<[string, string]>) {
      params[key] = value;
    }
  } else {
    params = searchParams;
  }

  const result = {
    page: '1',
    limit: customLimit,
    category: '' as Category,
    sort: '' as SortValue,
    grid: '4',
    selectedRating: '',
    min: '',
    max: ''
  };
  type Result = typeof result;

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      result[key as keyof Result] = params[key];
    }
  }

  return result;
}
