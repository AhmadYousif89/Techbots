import { useAuth } from '@clerk/nextjs';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { useRouter } from 'next/navigation';

export function CartPaymentView() {
  const { userId } = useAuth();
  const router = useRouter();

  return (
    <Card className='rounded-none py-10 min-h-screen'>
      <CardHeader className='space-y-4'>
        <CardTitle>Choose Your Payment</CardTitle>
        <CardDescription>
          Add your payment details here. We'll use this information to process your order.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'></CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            if (!userId) {
              router.push('/sign-in');
            }
          }}>
          Confirm your order
        </Button>
      </CardFooter>
    </Card>
  );
}
