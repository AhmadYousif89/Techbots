import { Category, TProduct, SortValue } from '@/app/products/_lib/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeString(str: string, removeHyphen = true) {
  if (!str) return '';
  let res = str[0].toUpperCase() + str.slice(1).toLowerCase();
  if (removeHyphen) return res.replace('-', ' ');
  const hyphenIdx = str.indexOf('-');
  if (hyphenIdx !== -1) {
    res =
      res.slice(0, hyphenIdx + 1) +
      res[hyphenIdx + 1].toUpperCase() +
      res.slice(hyphenIdx + 2);
  }
  return res;
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
