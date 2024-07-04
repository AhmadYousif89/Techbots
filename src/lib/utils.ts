import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Product } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeString(str: string) {
  return str[0].toUpperCase().concat(str.slice(1).replace('-', ' '));
}

export function getCartTotal(cart: Product[]) {
  const total = cart.reduce((acc, item) => acc + convertPriceString(item.price), 0);
  return +total.toFixed(2);
}

export function convertPriceString(price: string) {
  let numericPrice = price.replace('$', '');
  numericPrice = numericPrice.replace(/,/g, '');
  return parseFloat(numericPrice);
}
