'use client';

import { Button } from '@/components/ui/button';
import { useFilter } from '../../_lib/store';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

export function ApplyFiltersButton() {
  const router = useRouter();
  const { filterHasValue, resetFilter } = useFilter();
  const { selectedCategory } = useFilter(s => s.category);
  const { selectedBrands } = useFilter(s => s.brands);
  const { max, min } = useFilter(s => s.price);

  // const baseUrl = 'http://localhost:3000';
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  async function sendFilters() {
    try {
      const res = await fetch(`${baseUrl}/api/products/filter`, {
        method: 'POST',
        body: JSON.stringify({
          categories: selectedCategory,
          brands: selectedBrands,
          price: [min, max]
        })
      });

      if (res.ok) {
        console.log('Filters sent successfully');
      }
    } catch (error) {
      console.error('Error sending filters:', error);
    }
  }

  return (
    <div className='flex items-center gap-4 mb-2 lg:pl-4'>
      <Button
        size={'sm'}
        className='text-xs min-w-20'
        disabled={!filterHasValue()}
        onClick={() => {
          sendFilters();
          router.push('/products?fc=true');
        }}>
        Apply
      </Button>
      <Separator orientation='vertical' />
      <Button
        size={'sm'}
        variant={'link'}
        className='text-xs px-0'
        disabled={!filterHasValue()}
        onClick={() => {
          resetFilter();
          router.push('/products');
        }}>
        Reset
      </Button>
    </div>
  );
}
