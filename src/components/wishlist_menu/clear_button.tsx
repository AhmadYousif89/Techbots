import { toast } from 'sonner';
import { Info, Trash2 } from 'lucide-react';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { useLocalStorage } from '../hooks/use_local_storage';

export function ClearWishlistButton() {
  const [, , clearWishlist] = useLocalStorage('wishlist', []);

  return (
    <Accordion type='single' collapsible className='rounded overflow-hidden bg-muted'>
      <AccordionItem value='delete-wish' className='border-b-0'>
        <AccordionTrigger className='[&>svg]:hidden py-0 hover:no-underline'>
          <Button
            asChild
            className='py-2 px-3 w-full rounded-none border-0 hover:text-destructive hover:bg-primary'>
            <span>Clear Wishlist</span>
          </Button>
        </AccordionTrigger>

        <AccordionContent>
          <p className='text-center text-muted-foreground font-medium py-4'>
            Are you sure you want to clear your wishlist?
          </p>
          <div className='flex items-center justify-center'>
            <Button
              size={'sm'}
              variant={'destructive'}
              className='text-xs p-0 px-4 text-destructive gap-1 bg-transparent hover:bg-destructive/20'
              onClick={() => {
                clearWishlist();
                toast.custom(() => {
                  return (
                    <div className='flex items-center gap-4'>
                      <Info className='text-blue-500' />
                      <p className='text-sm'>Your wishlist is now empty.</p>
                    </div>
                  );
                });
              }}>
              <span>Procced</span>
              <Trash2 className='text-destructive size-4' />
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
