import { Metadata } from 'next';
import { capitalizeString } from '@/lib/utils';

import { ProductsView } from './products_view';
import { SearchParams } from '@/app/products/_lib/types';

export const generateMetadata = ({ searchParams }: PageProps): Metadata => {
  const category = capitalizeString(searchParams['cat'] ?? '', false);
  let brand = searchParams['brand'] ?? '';
  brand = brand.includes(',')
    ? brand
        .split(',')
        .map(b => capitalizeString(b))
        .join(', ')
    : brand;
  const title = `Shop ${category ? '| ' + category : ''}`;
  const description = `Find the best products online${
    category ? ` for ${category}${brand ? ` from ${brand}.` : '.'}` : '.'
  }`;

  return { title, description };
};

type PageProps = {
  params: Record<string, string>;
  searchParams: SearchParams;
};

export default function ProductsPage({ searchParams }: PageProps) {
  return (
    <main className='min-h-screen max-view mx-auto bg-background'>
      <ProductsView searchParams={searchParams} />
    </main>
  );
}
