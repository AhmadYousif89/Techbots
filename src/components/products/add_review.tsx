import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export function AddReview({ productName }: { productName: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Write a review</Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader className='mb-4'>
          <DialogTitle>Customer Review</DialogTitle>
          <DialogDescription>
            Review for {productName.split(' ').slice(0, 3).join(' ')}
          </DialogDescription>
        </DialogHeader>
        <div className='grid mb-4'>
          <Textarea
            id='name'
            className='col-span-3'
            placeholder='Type your review here.'
          />
        </div>
        <DialogFooter>
          <Button type='submit'>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
