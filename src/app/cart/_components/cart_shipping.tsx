"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "../_store/cart";
import { ShippingType } from "../_lib/types";
import { NEXT_DAY_SHIPPING_COST } from "../constants";
import useStore from "@/components/hooks/use-store";
import { ShippingFormKeys, useShippingStore } from "../_store/shipping_form";

const initTouchState = {
  firstname: false,
  lastname: false,
  mainAddress: false,
  optionalAddress: false,
  city: false,
  phone: false,
  shipping: false,
};

export function CartShippingView() {
  const router = useRouter();
  const { userId } = useAuth();
  const [touchState, setTouchState] = useState(initTouchState);
  const { data, setFormData } = useShippingStore();
  const formResult = useShippingStore((s) => s.formState());
  const VAT = useStore(useCartStore, (s) => s.getVAT()) ?? 0;
  const total = useStore(useCartStore, (s) => s.getTotalValue()) ?? 0;
  const cartCount = useStore(useCartStore, (s) => s.getTotalCount()) ?? 0;

  const handleInputChange = (value: string, name: ShippingFormKeys) => {
    setFormData({ ...data, [name]: value.trim() });
    setTouchState({ ...touchState, [name]: true });
  };

  const onShippingValueChange = (value: ShippingType) => {
    setFormData({ ...data, shipping: value });
  };

  let errors;
  if (formResult.success == false) {
    errors = formResult.error.formErrors.fieldErrors;
  }

  return (
    <Card className="min-h-screen rounded-none py-8">
      <CardContent className="lg:max-view grid max-w-screen-md gap-8 lg:grid-cols-2 lg:justify-between lg:divide-x">
        <CardHeader className="px-0">
          <CardTitle className="pb-8 text-muted-foreground">
            Shipping Information
          </CardTitle>
          <form className="grid gap-8 lg:col-[1]">
            <fieldset className="flex items-center gap-4 *:flex-1">
              <div className="relative">
                <Input
                  defaultValue={data.firstname}
                  placeholder="First Name"
                  name="firstname"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      e.target.name as ShippingFormKeys,
                    )
                  }
                />
                {errors && errors.firstname && touchState.firstname && (
                  <span className="absolute -bottom-5 left-2 w-full text-xs text-destructive">
                    {errors.firstname}
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  defaultValue={data.lastname}
                  placeholder="Last Name"
                  name="lastname"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      e.target.name as ShippingFormKeys,
                    )
                  }
                />
                {errors && errors.lastname && touchState.lastname && (
                  <span className="absolute -bottom-5 left-2 text-xs text-destructive">
                    {errors.lastname}
                  </span>
                )}
              </div>
            </fieldset>
            <fieldset className="space-y-8">
              <div className="relative">
                <Input
                  defaultValue={data.mainAddress}
                  placeholder="Main Address"
                  name="mainAddress"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      e.target.name as ShippingFormKeys,
                    )
                  }
                />
                {errors && errors.mainAddress && touchState.mainAddress && (
                  <span className="absolute -bottom-5 left-2 text-xs text-destructive">
                    {errors.mainAddress}
                  </span>
                )}
              </div>
              <Input
                defaultValue={data.optionalAddress}
                placeholder="Optional Address"
                name="optionalAddress"
                required={false}
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
                    e.target.name as ShippingFormKeys,
                  )
                }
              />
            </fieldset>
            <fieldset className="grid grid-cols-2 items-center gap-4">
              <div className="relative">
                <Input
                  defaultValue={data.city}
                  placeholder="City"
                  type="text"
                  name="city"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      e.target.name as ShippingFormKeys,
                    )
                  }
                />
                {errors && errors.city && touchState.city && (
                  <span className="absolute -bottom-5 left-2 text-xs text-destructive">
                    {errors.city}
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  defaultValue={data.phone > 0 ? data.phone : ""}
                  placeholder="Phone"
                  type="number"
                  name="phone"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      e.target.name as ShippingFormKeys,
                    )
                  }
                />
                {errors && errors.phone && touchState.phone && (
                  <span className="absolute -bottom-5 left-2 text-xs text-destructive">
                    {errors.phone}
                  </span>
                )}
              </div>
            </fieldset>

            <Separator />

            <RadioGroup
              name="shipping"
              value={data.shipping}
              defaultValue={data.shipping}
              onValueChange={onShippingValueChange}
              className="flex flex-wrap gap-4"
            >
              <Label
                htmlFor="r1"
                className="flex min-w-56 cursor-pointer items-center gap-4 rounded-lg bg-muted p-4 text-sm shadow-sm hover:bg-foreground/5"
              >
                <RadioGroupItem id="r1" value="free" />
                <div className="space-y-1">
                  <p className="text-xs font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">
                    Between 2-5 working days
                  </p>
                </div>
              </Label>

              <Label
                htmlFor="r2"
                className="flex min-w-56 cursor-pointer items-center gap-4 rounded-lg bg-muted p-4 text-sm shadow-sm hover:bg-foreground/5"
              >
                <RadioGroupItem value="next" id="r2" />
                <div className="space-y-1">
                  <p className="text-xs font-medium">
                    Next Day Shipping - ${NEXT_DAY_SHIPPING_COST}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    24 hour from checkout
                  </p>
                </div>
              </Label>
            </RadioGroup>
          </form>
        </CardHeader>

        <Separator className="lg:hidden" />

        <section className="flex max-w-screen-md flex-col lg:pl-8 lg:pt-6">
          <CardHeader className="px-0 pb-8 pt-0">
            <CardTitle className="text-muted-foreground">Summary</CardTitle>
          </CardHeader>

          <CardContent className="mb-8 px-0 pb-0">
            {/* Cart items */}
            <div className="flex items-center justify-between text-sm font-medium uppercase text-muted-foreground">
              <p>Items</p>
              <span>{cartCount}</span>
            </div>
            <Separator className="my-8" />
            {/* Subtotal */}
            <div className="flex items-center justify-between font-medium uppercase text-muted-foreground">
              <p className="text-sm">Subtotal</p>
              <span className="text-sm">${total.toFixed(2)}</span>
            </div>
            <div className="my-4 flex items-center justify-between font-medium uppercase text-muted-foreground">
              <p className="text-sm">Shipping</p>
              <span className="text-sm">
                {data.shipping === "next"
                  ? `$${NEXT_DAY_SHIPPING_COST}`
                  : "Free"}
              </span>
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
          </CardContent>
        </section>
      </CardContent>
      <CardFooter className="justify-end gap-4 lg:justify-center lg:py-8">
        <Button
          disabled={formResult.success == false}
          onClick={() => {
            if (!userId) {
              router.push("/sign-in");
              return;
            }
            router.push("/cart#cart-payment");
          }}
        >
          Continue to payment
        </Button>
        <Button
          variant={"outline"}
          className="w-28"
          onClick={() => {
            router.push("/cart#cart-list", { scroll: true });
          }}
        >
          Back
        </Button>
      </CardFooter>
    </Card>
  );
}
