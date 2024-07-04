'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

export function SearchProducts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Button
      title='search'
      variant={'ghost'}
      className='group size-auto p-0 aspect-square rounded-full ring-2 ring-input hover:bg-input'>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem className='text-xs'>Galaxy Mobile</CommandItem>
            <CommandItem className='text-xs'>Apple Mac</CommandItem>
            <CommandItem className='text-xs'>Gaming Keyboard</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <Search
        strokeWidth={2.5}
        className='size-6 p-1 text-muted-foreground'
        onClick={() => setOpen(true)}
      />
    </Button>
  );
}
