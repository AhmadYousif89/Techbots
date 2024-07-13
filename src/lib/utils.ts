import { Category, TProduct, SortValue } from '@/app/products/_lib/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
