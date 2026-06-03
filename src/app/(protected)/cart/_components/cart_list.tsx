"use client";

import { useRouter } from "next/navigation";
import { Fragment, use, useState } from "react";
import { ShoppingCart, Slash } from "lucide-react";

import { TServerCart } from "../_lib/types";
import { CartItem } from "./cart_item";
import { useCartStore } from "../_store/cart";
import { VAT_PERCENTAGE } from "../_lib/constants";
import { DeleteCartItems } from "./delete_button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useStore from "@/app/components/hooks/use-store";
import { useShippingStore } from "../_store/shipping_form";
import {
  getCartTotalValue,
  getCartVAT,
  isCartCouponValid,
  setCouponValue,
} from "../_store/cart";
import { CartEmpty } from "./cart_empty";

type CartListViewProps = {
  getServerCart: Promise<TServerCart>;
};

export function CartListView({ getServerCart }: CartListViewProps) {
  const router = useRouter();
  const serverCart = use(getServerCart);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localCouponValue, setLocalCouponValue] = useState("");

  const cart = useStore(useCartStore, (s) => s.cart);
  const coupon = useStore(useCartStore, (s) => s.coupon) ?? "";
  const shipping = useShippingStore((s) => s.data.shipping);
  const total =
    cart !== undefined
      ? getCartTotalValue(cart, shipping, coupon)
      : (serverCart?.totalValue ?? 0);
  const VAT =
    cart !== undefined
      ? getCartVAT(total)
      : (serverCart?.totalValue || 0) * VAT_PERCENTAGE;
  const cartCount = cart?.length ?? serverCart?.count ?? 0;
  const couponIsValid = isCartCouponValid(coupon);

  let content;
  const serverCartItems = serverCart?.cartItems || [];

  if (cartCount === 0) {
    content = <CartEmpty />;
  } else {
    const data = cart ?? serverCartItems;

    content = (
      <CardContent className="flex flex-col gap-8 pt-6 *:flex-1 md:flex-row">
        <section className="flex flex-col gap-8 overflow-y-auto overscroll-contain pb-4">
          {data.map((item, i) => (
            <Fragment key={`${i}:${item.asin}`}>
              <CartItem
                asin={item.asin}
                serverItem={"product" in item ? item.product : undefined}
                serverItemQuantity={
                  "quantity" in item ? item.quantity : undefined
                }
              />
            </Fragment>
          ))}
        </section>

        <section className="flex flex-col">
          <header className="pb-6">
            <CardTitle className="text-muted-foreground">Summary</CardTitle>
          </header>

          <Accordion collapsible type="single" title="Enter coupon">
            <AccordionItem value="coupon">
              <AccordionTrigger className="text-xs uppercase text-muted-foreground hover:text-foreground/50 hover:underline">
                I have a coupon code
              </AccordionTrigger>
              <AccordionContent className="pr-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCouponValue(localCouponValue);
                    setIsSubmitted(true);
                  }}
                  className="relative my-2 flex items-center justify-between gap-4"
                >
                  <Input
                    value={localCouponValue}
                    placeholder="Enter coupon code"
                    className="focus-visible:rounded-lg focus-visible:ring-inset"
                    onChange={(e) => setLocalCouponValue(e.target.value)}
                  />
                  {isSubmitted && !couponIsValid && (
                    <span className="absolute left-2 top-10 text-sm font-medium text-destructive">
                      Invalid coupon code
                    </span>
                  )}
                  {couponIsValid && (
                    <span className="absolute left-2 top-10 text-sm font-medium text-green-500">
                      {coupon.slice(0, 2)}% discount applied
                    </span>
                  )}
                  <Button
                    size={"sm"}
                    disabled={!localCouponValue || coupon === localCouponValue}
                    type="submit"
                  >
                    Apply
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="my-8">
            <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
              <p className="text-sm">Subtotal</p>
              <span className="text-sm">${total.toFixed(2)}</span>
            </div>
            <div className="my-4 flex items-center justify-between font-medium uppercase text-muted-foreground">
              <p className="text-sm">Shipping</p>
              <span className="text-sm">free</span>
            </div>
            <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
              <p className="text-sm">Taxes</p>
              <span className="text-sm">${VAT.toFixed(2)}</span>
            </div>
            <Separator className="my-8" />
            <div className="flex items-center justify-between text-lg font-semibold uppercase text-muted-foreground">
              <p>Total</p>
              <span>${(total + VAT).toFixed(2)}</span>
            </div>
          </div>
        </section>
      </CardContent>
    );
  }

  return (
    <Card className="rounded-none border-0 shadow-none">
      {cartCount > 0 && (
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-muted-foreground">Cart Details</CardTitle>
          <DeleteCartItems action="deleteAll" />
        </CardHeader>
      )}
      <>{content}</>
      {cartCount > 0 && (
        <CardFooter className="justify-center gap-4 p-6">
          <Button
            size={"sm"}
            disabled={cartCount == 0}
            className="w-28"
            onClick={() => {
              router.push("/cart#cart-details", { scroll: true });
            }}
          >
            Next
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="w-28"
            onClick={() => {
              router.replace(`/products`);
            }}
          >
            Cancle
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
