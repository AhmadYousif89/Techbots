import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type OrderProps = {
  params: { oId: string };
};

const dummyItems = [
  {
    id: "B098JGRWFX",
    image: "https://m.media-amazon.com/images/I/61gC6PBsRPL.jpg",
    title: "Astro A10 Gaming Headset Gen 2 Wired - Over-Ear Headphones",
    price: "$54.99",
  },
  {
    id: "B0BT3FKZ3N",
    image: "https://m.media-amazon.com/images/I/71Fr-EEsp6L.jpg",
    title: 'MSI Katana 15 15.6" 144Hz FHD Gaming Laptop',
    price: "$899.99",
  },
  {
    id: "B098JGRWFX",
    image: "https://m.media-amazon.com/images/I/61gC6PBsRPL.jpg",
    title: "Astro A10 Gaming Headset Gen 2 Wired - Over-Ear Headphones",
    price: "$54.99",
  },
  {
    id: "B0BT3FKZ3N",
    image: "https://m.media-amazon.com/images/I/71Fr-EEsp6L.jpg",
    title: 'MSI Katana 15 15.6" 144Hz FHD Gaming Laptop',
    price: "$899.99",
  },
];

export default function OrderPage({ params: { oId } }: OrderProps) {
  const total = dummyItems.reduce(
    (acc, { price }) => acc + parseFloat(price.replace("$", "")),
    0,
  );

  return (
    <main className="max-view mx-auto min-h-screen bg-secondary">
      <Card className="flex flex-col rounded-none px-4 py-8 xl:p-8">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center">
            Order #<span className="text-2xl text-muted-foreground">{oId}</span>
          </CardTitle>
        </CardHeader>
        <Separator />
        {/* Items */}
        <Card className="my-8 p-4">
          <CardHeader className="p-0 py-6">
            <CardTitle className="pb-2 text-lg font-semibold text-muted-foreground">
              Items
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 px-0 pb-0 sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] lg:gap-8">
            {dummyItems.map(({ id, image, title, price }, i) => (
              <Card
                key={id + i}
                className="flex max-w-md items-center gap-4 rounded-none border-0 bg-transparent p-4 shadow-none"
              >
                <Image
                  className="size-16 object-contain"
                  width={100}
                  height={100}
                  src={image}
                  alt={title}
                />
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/products/${id}`}
                    className="hover:text-blue-500 hover:underline"
                  >
                    <p className="text-xs font-medium text-muted-foreground">
                      {title}
                    </p>
                  </Link>
                  <p className="text-sm font-medium">{price}</p>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col justify-between gap-8 *:flex-1 md:flex-row">
          {/* Summary */}
          <Card className="p-4">
            <CardHeader className="p-0 py-6">
              <CardTitle className="pb-2 text-lg font-semibold text-muted-foreground">
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="divide-y *:p-2">
                <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <p className="text-sm">Items</p>
                  <span className="text-sm">{dummyItems.length}</span>
                </div>
                <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <p className="text-sm">Subtotal</p>
                  <span className="text-sm">${total}</span>
                </div>
                <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <p className="text-sm">Shipping</p>
                  <span className="text-sm">free</span>
                </div>
                <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
                  <p className="text-sm">Status</p>
                  <span className="text-sm">Paid</span>
                </div>
              </div>
              <CardFooter className="mt-4 h-10 items-center justify-between border-t border-muted-foreground bg-muted p-0 px-2 font-semibold uppercase text-muted-foreground hover:bg-muted/50">
                <p>Total</p>
                <span>${total.toFixed(2)}</span>
              </CardFooter>
            </CardContent>
          </Card>
          {/* Shipping */}
          <Card className="p-4">
            <CardHeader className="p-0 py-6">
              <CardTitle className="pb-2 text-lg font-semibold text-muted-foreground">
                Shipping Info
              </CardTitle>
            </CardHeader>
            <div className="grid gap-2 border-l pl-4">
              <CardDescription className="text-sm">
                Name: <span className="font-semibold">John Doe</span>
              </CardDescription>
              <CardDescription className="text-sm">
                Address:{" "}
                <span className="font-semibold">
                  1234 Labor St, Zayed, Giza, EG
                </span>
              </CardDescription>
              <CardDescription className="text-sm">
                Contact Phone:{" "}
                <span className="font-semibold">(217) 555-5555</span>
              </CardDescription>
              <CardDescription className="text-sm">
                City: <span className="font-semibold">Giza</span>
              </CardDescription>
              <CardDescription className="text-sm">
                Status: <span className="font-semibold">In Transite</span>
              </CardDescription>
            </div>
          </Card>
        </div>
      </Card>
    </main>
  );
}
