import { Filter } from 'lucide-react';
import { Button } from '../ui/button';

export function FilterProducts() {
  return (
    <div className='px-2 flex items-center gap-4 divide-y'>
      <Button
        variant={'outline'}
        className='group w-20 h-10 gap-2 text-xs rounded border border-dashed p-0 bg-transparent hover:border-transparent '>
        <Filter size={15} className='group-hover:fill-muted' />
        <span>Filter</span>
      </Button>
      <Button className='relative text-xs min-w-20 h-10 pl-4 flex items-center justify-center font-medium text-muted-foreground rounded-lg border border-dashed p-2 bg-muted/70 hover:bg-muted-foreground/70 hover:border-transparent hover:text-background'>
        <span className='absolute top-0 left-0'>{/* close icon */}</span>
        <p>Computers</p>
      </Button>
    </div>
  );
}
