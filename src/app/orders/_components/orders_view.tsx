import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, FileDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export function OrdersView() {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
  ];

  let noInvoiceContent;
  if (invoices.length === 0) {
    noInvoiceContent = (
      <h2 className="flex items-center justify-center">
        <span className="text-lg font-medium text-muted-foreground">
          You don't have any invoices.
        </span>
      </h2>
    );
  }

  return (
    <Card className="rounded-none p-4 xl:p-8">
      <CardHeader className="px-0">
        <CardTitle className="flex items-center">My Orders</CardTitle>
      </CardHeader>
      <Separator />

      <Card className="mt-8 max-w-xs p-4">
        <CardHeader className="p-0">
          <CardTitle className="pb-2 text-lg">Personal Info</CardTitle>
        </CardHeader>
        <div className="grid gap-1 border-l pl-4">
          <CardDescription className="text-xs lg:text-sm">
            Placed by: <span className="font-semibold">John Doe</span>
          </CardDescription>
          <CardDescription className="text-xs lg:text-sm">
            Email: <span className="font-semibold">Johndoe@gmail.com</span>
          </CardDescription>
          <CardDescription className="text-xs lg:text-sm">
            Total orders:{" "}
            <span className="font-semibold">{invoices.length}</span>
          </CardDescription>
        </div>
      </Card>

      <Card className="mt-8 flex flex-col p-4">
        <CardHeader className="flex-row justify-between px-0">
          <CardTitle className="flex items-center">Invoices</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="aspect-square size-7 rounded-full border p-0"
              >
                <EllipsisVertical className="size-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2">
              <DropdownMenuLabel className="py-2 text-sm font-semibold text-muted-foreground">
                Actions
              </DropdownMenuLabel>
              <Separator />
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="justify-start gap-2 px-2 text-xs text-muted-foreground"
                >
                  <FileDownIcon className="size-4" /> Download
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-0">
          {noInvoiceContent}
          {invoices.length > 0 && (
            <Table className="mx-auto max-w-screen-lg">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-14 max-sm:px-0">
                    Invoice
                  </TableHead>
                  <TableHead className="min-w-14 max-sm:px-0">Status</TableHead>
                  <TableHead className="min-w-14 max-sm:px-0">Method</TableHead>
                  <TableHead className="text-right max-sm:px-0">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="text-xs font-medium hover:underline max-sm:px-0 lg:text-sm">
                      <Link href={`/orders/${invoice.invoice}`}>
                        {invoice.invoice}
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs max-sm:px-0 lg:text-sm">
                      {invoice.paymentStatus}
                    </TableCell>
                    <TableCell className="text-xs max-sm:px-0 lg:text-sm">
                      {invoice.paymentMethod}
                    </TableCell>
                    <TableCell className="text-right text-xs max-sm:px-0 lg:text-sm">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="font-semibold lg:text-lg">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-semibold lg:text-lg">
                    $
                    {invoices
                      .reduce(
                        (acc, curr) =>
                          acc + parseFloat(curr.totalAmount.slice(1)),
                        0,
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
