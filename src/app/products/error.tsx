'use client';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ErrorBoundaryProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const router = useRouter();

  return (
    <main className='min-h-screen max-view mx-auto bg-background grid place-content-center'>
      <Card className='p-4 min-w-96 max-w-screen-sm'>
        <CardHeader className='space-y-4'>
          <CardTitle className='pb-2'>Error!</CardTitle>
          <CardDescription className='text-lg font-medium'>
            {error.message}
          </CardDescription>
        </CardHeader>

        <CardFooter className='gap-4'>
          <Button className='text-xs w-20' onClick={() => router.back()}>
            Back
          </Button>
          <Button variant={'outline'} onClick={reset} className='text-xs'>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
