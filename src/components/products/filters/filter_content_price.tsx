'use client';

import { ChangeEventHandler, SetStateAction, useState } from 'react';
import { convertPriceString } from '@/lib/utils';
import { Product } from '@/lib/types';

import { Input } from '../../ui/input';

type Props = { products: Product[]; onFilter?: (p: Product[]) => void };

export function FilterContentPrice({ products, onFilter }: Props) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = e => {
    setMin(e.target.valueAsNumber);
  };

  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = e => {
    setMax(e.target.valueAsNumber);
  };

  const filterProducts = () => {
    let filteredProducts = [...products];

    if (min && !isNaN(min)) {
      filteredProducts = filteredProducts.filter(
        product => convertPriceString(product.price) >= min
      );
    }

    if (max && !isNaN(max)) {
      filteredProducts = filteredProducts.filter(
        product => convertPriceString(product.price) <= max
      );
    }

    if (min && max && !isNaN(min) && !isNaN(max)) {
      filteredProducts = filteredProducts.filter(
        product =>
          convertPriceString(product.price) >= min &&
          convertPriceString(product.price) <= max
      );
    }

    // onFilter(filteredProducts);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='font-medium text-muted-foreground'>Price</h3>
      <div className='grid grid-cols-2 gap-4'>
        <Input
          id='min'
          type='number'
          placeholder='Min'
          value={min}
          onChange={handleMinChange}
        />
        <Input
          id='max'
          type='number'
          placeholder='Max'
          value={max}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}
