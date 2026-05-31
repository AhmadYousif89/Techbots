import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  VAT_PERCENTAGE,
  VALID_COUPONS,
  NEXT_DAY_SHIPPING_COST,
} from "../_lib/constants";
import { TProduct } from "@/app/lib/types";
import { ShippingType } from "../_lib/types";
import { normalizePrice } from "@/app/lib/utils";

export type TCartStoreItem = Omit<TProduct, "price"> & {
  price: number | string;
  cartQuantity: number;
};

export type CartState = {
  cart: TCartStoreItem[];
  coupon: string;
};

export const useCartStore = create<CartState>()(
  persist(
    (): CartState => ({
      cart: [],
      coupon: "",
    }),
    { name: "cart" },
  ),
);

export function getCartTotalValue(
  cart: TCartStoreItem[],
  shipping: ShippingType,
  coupon = "",
) {
  const subtotal = cart.reduce(
    (acc, item) => acc + normalizePrice(item.price) * (item.cartQuantity ?? 0),
    0,
  );
  const shippingValue = shipping === "next" ? NEXT_DAY_SHIPPING_COST : 0;
  const total = subtotal + shippingValue;
  const normalizedCoupon = coupon.toLowerCase();

  if (normalizedCoupon === "25off") return total * 0.75;

  if (normalizedCoupon === "50off") return total * 0.5;

  return total;
}

export function getCartVAT(totalValue: number) {
  return totalValue * VAT_PERCENTAGE;
}

export function isCartCouponValid(coupon: string) {
  return VALID_COUPONS.includes(coupon.toLowerCase());
}

export function addToCart(item: TProduct) {
  useCartStore.setState((state) => ({
    cart: [
      ...state.cart,
      {
        ...item,
        price: normalizePrice(item.price),
        cartQuantity: item.cartQuantity ?? 1,
      },
    ],
  }));
}

export function increaseQuantity(asin: string) {
  useCartStore.setState((state) => ({
    cart: state.cart.map((cartItem) =>
      cartItem.asin === asin
        ? {
            ...cartItem,
            cartQuantity: (cartItem.cartQuantity ?? 0) + 1,
          }
        : cartItem,
    ),
  }));
}

export function decreaseQuantity(asin: string) {
  useCartStore.setState((state) => ({
    cart: state.cart.map((cartItem) =>
      cartItem.asin === asin
        ? {
            ...cartItem,
            cartQuantity: (cartItem.cartQuantity ?? 0) - 1,
          }
        : cartItem,
    ),
  }));
}

export function removeFromCart(asin: string) {
  useCartStore.setState((state) => ({
    cart: state.cart.filter((cartItem) => cartItem.asin !== asin),
  }));
}

export function setCouponValue(value: string) {
  useCartStore.setState({ coupon: value });
}

export function clearCart() {
  useCartStore.setState({ cart: [], coupon: "" });
}
