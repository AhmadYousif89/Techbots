import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import { EllipsisVertical, FileDownIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu';

export function OrdersView() {
  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card'
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal'
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer'
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card'
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal'
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer'
    }
  ];

  let noInvoiceContent;
  if (invoices.length === 0) {
    noInvoiceContent = (
      <h2 className='flex items-center justify-center'>
        <span className='text-lg text-muted-foreground font-medium'>
          You don't have any invoices.
        </span>
      </h2>
    );
  }

  return (
    <Card className='p-4 xl:p-8 rounded-none'>
      <CardHeader className='px-0'>
        <CardTitle className='flex items-center'>My Orders</CardTitle>
      </CardHeader>
      <Separator />

      <Card className='p-4 mt-8 max-w-xs'>
        <CardHeader className='p-0'>
          <CardTitle className='pb-2 text-lg'>Personal Info</CardTitle>
        </CardHeader>
        <div className='grid gap-1 pl-4 border-l'>
          <CardDescription className='text-xs lg:text-sm'>
            Placed by: <span className='font-semibold'>John Doe</span>
          </CardDescription>
          <CardDescription className='text-xs lg:text-sm'>
            Email: <span className='font-semibold'>Johndoe@gmail.com</span>
          </CardDescription>
          <CardDescription className='text-xs lg:text-sm'>
            Total orders: <span className='font-semibold'>{invoices.length}</span>
          </CardDescription>
        </div>
      </Card>

      <Card className='p-4 mt-8 flex flex-col'>
        <CardHeader className='px-0 flex-row justify-between'>
          <CardTitle className='flex items-center'>Invoices</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={'ghost'}
                className='p-0 rounded-full aspect-square size-7 border'>
                <EllipsisVertical className='size-5 text-muted-foreground' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='p-2'>
              <DropdownMenuLabel className='py-2 text-sm text-muted-foreground font-semibold'>
                Actions
              </DropdownMenuLabel>
              <Separator />
              <DropdownMenuItem>
                <Button
                  variant='ghost'
                  className='gap-2 px-2 justify-start text-xs text-muted-foreground'>
                  <FileDownIcon className='size-4' /> Download
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className='p-0'>
          {noInvoiceContent}
          {invoices.length > 0 && (
            <Table className='mx-auto max-w-screen-lg'>
              <TableHeader>
                <TableRow>
                  <TableHead className='max-sm:px-0 min-w-14'>Invoice</TableHead>
                  <TableHead className='max-sm:px-0 min-w-14'>Status</TableHead>
                  <TableHead className='max-sm:px-0 min-w-14'>Method</TableHead>
                  <TableHead className='text-right max-sm:px-0'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map(invoice => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className='text-xs lg:text-sm max-sm:px-0 font-medium hover:underline'>
                      <Link href={`/orders/${invoice.invoice}`}>{invoice.invoice}</Link>
                    </TableCell>
                    <TableCell className='text-xs lg:text-sm max-sm:px-0'>
                      {invoice.paymentStatus}
                    </TableCell>
                    <TableCell className='text-xs lg:text-sm max-sm:px-0'>
                      {invoice.paymentMethod}
                    </TableCell>
                    <TableCell className='text-xs lg:text-sm max-sm:px-0 text-right'>
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className='lg:text-lg font-semibold'>
                    Total
                  </TableCell>
                  <TableCell className='text-right lg:text-lg font-semibold'>
                    $
                    {invoices
                      .reduce(
                        (acc, curr) => acc + parseFloat(curr.totalAmount.slice(1)),
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
              <TableCaption>A list of your recent invoices.</TableCaption>
            </Table>
          )}
        </CardContent>
      </Card>
    </Card>
  );
}
