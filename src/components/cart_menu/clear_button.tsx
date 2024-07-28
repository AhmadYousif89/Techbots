import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { Info, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { useCartStore } from '@/app/cart/_store/cart';
import { clearServerCart, removeFromServerCart } from '@/app/cart/_actions/actions';

export function ClearCartButton() {
  const router = useRouter();
  const { userId } = useAuth();
  const clearCart = useCartStore(s => s.clearCart);

  const handleDelete = () => {
    clearCart();
    if (userId) {
      clearServerCart(userId);
    }
  };

  return (
    <Accordion type='single' collapsible className='rounded overflow-hidden bg-muted'>
      <AccordionItem value='delete-wish' className='border-b-0'>
        <AccordionTrigger className='[&>svg]:hidden py-0 hover:no-underline'>
          <Button
            asChild
            className='py-2 px-3 w-full rounded-none border-0 hover:text-destructive hover:bg-primary'>
            <span>Clear Cart</span>
          </Button>
        </AccordionTrigger>

        <AccordionContent>
          <p className='text-center text-muted-foreground font-medium py-4'>
            Are you sure you want to clear your cart?
          </p>
          <div className='flex items-center justify-center'>
            <Button
              size={'sm'}
              variant={'destructive'}
              className='text-xs p-0 px-4 text-destructive gap-1 bg-transparent hover:bg-destructive/20'
              onClick={() => {
                handleDelete();
                toast.custom(() => {
                  return (
                    <div className='flex items-center gap-4'>
                      <Info className='text-blue-500' />
                      <p className='text-sm'>Your cart is now empty.</p>
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
