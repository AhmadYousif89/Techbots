import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

export function FilterContentPrice() {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='font-medium text-muted-foreground'>Price</h3>
      <div className='grid grid-cols-2 gap-4'>
        <Input id='min' type='number' name='price-min' placeholder='Min' />
        <Input id='max' type='number' name='price-max' placeholder='Max' />
      </div>
    </div>
  );
}
