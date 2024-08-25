"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Ban } from "lucide-react";

import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useStore from "@/app/components/hooks/use-store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardTitle, CardFooter, CardContent } from "@/components/ui/card";

import { useCartStore } from "../../cart/_store/cart";
import { NEXT_DAY_SHIPPING_COST } from "../../cart/constants";
import { useShippingStore } from "../../cart/_store/shipping_form";

const loader = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

type CheckoutProps = {
  clientSecret: string;
};

export function Checkout({ clientSecret }: CheckoutProps) {
  return (
    <Elements stripe={loader} options={{ clientSecret }}>
      <PaymentInformation />
    </Elements>
  );
}

function PaymentInformation() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const data = useShippingStore((s) => s.data);
  const cart = useStore(useCartStore, (s) => s.cart) ?? [];
  const VAT = useStore(useCartStore, (s) => s.getVAT()) ?? 0;
  const total = useStore(useCartStore, (s) => s.getTotalValue()) ?? 0;
  const cartCount = useStore(useCartStore, (s) => s.getTotalCount()) ?? 0;

  const fullAmount = (total + VAT).toFixed(2);
  const isDisabled = !stripe || !elements || isLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !email) {
      toast.error("Please fill up all required fields", {
        icon: <Ban className="text-destructive" />,
        duration: 5000,
      });
      return;
    }
    setIsloading(true);

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/stripe/success`;
    // const url = `http://localhost:3000/checkout/stripe/success`;
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: url,
        },
      })
      .then(({ error }) => {
        if (error.type == "card_error" || error.type == "validation_error") {
          toast.error(error.message, {
            icon: <Ban className="text-destructive" />,
            duration: 5000,
          });
        } else {
          toast.error("An error occurred, please try again", {
            icon: <Ban className="text-destructive" />,
            duration: 5000,
          });
        }
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <section className="mx-auto max-w-screen-lg px-4 py-0">
      <div className="flex items-center justify-between">
        <h2 className="py-6 text-xl font-semibold text-muted-foreground">
          Order Summary
        </h2>
        <Link
          href="/cart"
          className="text-sm hover:text-blue-600 hover:underline"
        >
          Edit Cart
        </Link>
      </div>
      <Card className="p-6">
        <CardContent className="px-0 pb-0">
          <Dialog>
            <DialogTrigger className="relative h-full w-full">
              <div className="flex cursor-pointer items-center justify-between text-sm font-medium uppercase text-muted-foreground underline">
                <p>Items</p>
                <span>{cartCount}</span>
              </div>
            </DialogTrigger>
            <DialogContent className="overscroll-y-auto px-4 py-12">
              {cart.map((item, index) => (
                <Card
                  key={index}
                  className="group flex items-center gap-4 px-4"
                >
                  <div className="flex flex-1 items-center gap-4">
                    <Image
                      src={item.mainImage}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="size-20 object-contain"
                    />
                    <Link
                      href={`/products/${item.asin}`}
                      className="hover:text-blue-500 hover:underline"
                    >
                      <CardTitle className="text-sm font-medium">
                        {item.title.split(" ").slice(0, 4).join(" ")}
                      </CardTitle>
                    </Link>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className="font-medium">
                      $ {item.price.toFixed(2)}
                    </Badge>
                    <span className="text-sm font-medium">
                      x {item.cartQuantity}
                    </span>
                  </div>
                </Card>
              ))}
            </DialogContent>
          </Dialog>
          <Separator className="my-4" />
          {/* Subtotal */}
          <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
            <p className="text-sm">Subtotal</p>
            <span className="text-sm">${total}</span>
          </div>
          <div className="my-4 flex items-center justify-between font-medium uppercase text-muted-foreground">
            <p className="text-sm">Shipping</p>
            <span className="text-sm">
              {data.shipping === "next" ? `$${NEXT_DAY_SHIPPING_COST}` : "Free"}
            </span>
          </div>
          <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
            <p className="text-sm">Taxes</p>
            <span className="text-sm">${VAT.toFixed(2)}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between text-sm font-semibold uppercase text-muted-foreground">
            <p>Total</p>
            <span>${fullAmount}</span>
          </div>
        </CardContent>
      </Card>
      <h2 className="py-6 text-xl font-semibold text-muted-foreground">
        Payment Information
      </h2>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <PaymentElement className="py-6" />
          <div>
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
          <CardFooter className="px-0 pt-6">
            <Button disabled={isDisabled}>
              {isLoading ? "Processing..." : <>Purchase | ${fullAmount}</>}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
