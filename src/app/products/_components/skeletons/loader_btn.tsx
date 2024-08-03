import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

export function LoaderButton() {
  return (
    <Skeleton className='flex w-28 h-10 p-2 justify-center bg-muted rounded-lg'>
      <Loader2 className='animate-spin text-muted-foreground' />
    </Skeleton>
  );
}
