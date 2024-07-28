import { Category, SearchParams, SortValue } from './types';

export function extractSearchParams(
  searchParams: SearchParams | IterableIterator<[string, string]>
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
    page: '',
    brand: '',
    category: '' as Category,
    sort: '' as SortValue,
    grid: '',
    selectedRating: '',
    min: '',
    max: '',
    cid: '',
  };
  type Result = typeof result;

  for (const key in params) {
    if (key === 'cat') {
      result['category'] = params[key];
      continue;
    } else if (key === 'sr') {
      result['selectedRating'] = params[key];
      continue;
    }
    result[key as keyof Result] = params[key];
  }

  return result;
}
