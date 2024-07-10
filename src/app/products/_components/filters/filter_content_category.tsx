import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { capitalizeString } from '@/lib/utils';
import { categories } from '@/app/products/_actions/actions';

export async function FilterContentCategory() {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='font-medium text-muted-foreground'>Category</h3>
      <div className='px-2 grid grid-cols-[repeat(2,minmax(auto,1fr))] gap-y-2 md:gap-x-8 space-y-1'>
        {categories.map(category => (
          <div key={category} className='flex items-center gap-2'>
            <Input id={category} type='checkbox' className='w-4 h-4 cursor-pointer' />
            <Label
              htmlFor={category}
              className='text-xs cursor-pointer hover:text-muted-foreground'>
              {capitalizeString(category)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
