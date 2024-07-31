import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='min-h-screen max-view mx-auto bg-background grid place-content-center'>
      <Card className='p-4 min-w-96'>
        <CardHeader className='space-y-4'>
          <CardTitle className='pb-2'>Not Found :/</CardTitle>
          <CardDescription className='text-lg font-medium'>
            The product you are looking for is not available.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button
            variant={'outline'}
            className='text-xs text-muted-foreground font-medium'>
            <Link href='/products'>Back To Shop</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
