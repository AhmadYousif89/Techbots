import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Ban, CheckSquare, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function AddReview({ productName }: { productName: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Write a review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customer Review</DialogTitle>
          <DialogDescription>
            Review for {productName.split(' ').slice(0, 3).join(' ')}
          </DialogDescription>
        </DialogHeader>
        <div className='grid mb-4'>
          <div className='flex items-center mb-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Button
                key={index}
                variant={'ghost'}
                onClick={() => setRating(index + 1)}
                className='size-8 p-0 rounded-full group'>
                <Star
                  className={cn(
                    'size-5 text-input group-hover:text-muted-foreground',
                    rating >= index + 1 ? 'fill-yellow-500 text-yellow-500' : ''
                  )}
                />
              </Button>
            ))}
          </div>
          <Textarea
            id='name'
            value={content}
            className='col-span-3'
            placeholder='Type your review here.'
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (rating == 0) {
                toast.custom(
                  () => (
                    <div className='flex items-center gap-4'>
                      <Ban className='text-red-400' />
                      <p className='text-sm'>Please select a rating</p>
                    </div>
                  ),
                  { duration: 5000 }
                );
                return;
              }
              if (!content || content.length < 10) {
                toast.custom(
                  () => (
                    <div className='flex items-center gap-4'>
                      <Ban className='text-red-400' />
                      <p className='text-sm'>Review must have at least 10 characters</p>
                    </div>
                  ),
                  { duration: 5000 }
                );
                return;
              }
              setOpen(false);
              toast.custom(() => {
                return (
                  <div className='flex items-center gap-4'>
                    <CheckSquare className='text-green-400' />
                    <p className='text-sm'>Review submitted successfully</p>
                  </div>
                );
              });
            }}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
