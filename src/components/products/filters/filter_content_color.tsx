import { capitalizeString } from '@/lib/utils';

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

type FilterContentColorsProps = {
  colors: string[];
};

export function FilterContentColors({ colors }: FilterContentColorsProps) {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='font-medium text-muted-foreground'>Color</h3>
      <div className='px-2 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 space-y-1'>
        {colors.map(color => (
          <div key={color} className='flex items-center gap-2'>
            <Input id={color} type='checkbox' className='w-4 h-4 cursor-pointer' />
            <Label
              htmlFor={color}
              className='text-xs cursor-pointer hover:text-muted-foreground'>
              {capitalizeString(color)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
