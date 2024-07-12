'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  const category = location.search
    .split('&')
    .filter(x => x.includes('category'))[0]
    .split('=')[1];

  return (
    <main className='min-h-screen max-w-screen-xl mx-auto bg-background grid place-content-center'>
      <Card className='p-4 rounded-none max-w-screen-lg mx-auto'>
        <CardHeader className='space-y-4'>
          <CardTitle>Error!</CardTitle>
          <CardDescription>
            An unexpected error occurred while trying to load this page. Please try again.
          </CardDescription>
        </CardHeader>

        <CardFooter className='gap-4'>
          <Button
            variant={'outline'}
            onClick={() => location.reload()}
            className='text-xs'>
            Try Again
          </Button>
          <Button
            className='text-xs w-20'
            onClick={() => location.replace(location.pathname + `?category=${category}`)}>
            Back
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
