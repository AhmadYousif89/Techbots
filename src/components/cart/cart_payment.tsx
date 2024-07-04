import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';

export function CartPaymentView() {
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
        <Button>Confirm your order</Button>
      </CardFooter>
    </Card>
  );
}
