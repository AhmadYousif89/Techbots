import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

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
