import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useShippingStore } from "./shipping_form";
import {
  VAT_PERCENTAGE,
  VALID_COUPONS,
  NEXT_DAY_SHIPPING_COST,
} from "../constants";
import { TProduct } from "@/app/lib/types";
import { normalizePrice } from "@/app/lib/utils";

export type TCartStoreItem = Omit<TProduct, "price"> & {
  price: number | string;
  cartQuantity: number;
};

export type CartState = {
  cart: TCartStoreItem[];
  getVAT: () => number;
  getTotalCount: () => number;
  getTotalValue: () => number;
  addToCart: (item: TProduct) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  coupon: string;
  setCouponValue: (value: string) => void;
  couponIsValid: () => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalCount: () => {
        const { cart } = get();
        return cart.length;
      },
      getTotalValue: () => {
        const { cart } = get();
        const ShippingType = useShippingStore.getState().data.shipping;
        const total = cart.reduce(
          (acc, item) =>
            acc + normalizePrice(item.price) * (item.cartQuantity ?? 0),
          0,
        );

        return ShippingType === "next" ? total + NEXT_DAY_SHIPPING_COST : total;
      },
      getVAT: () => {
        const { getTotalValue: totalValue } = get();
        return totalValue() * VAT_PERCENTAGE;
      },
      addToCart: (item) =>
        set((state) => ({
          cart: [
            ...state.cart,
            {
              ...item,
              price: normalizePrice(item.price),
              cartQuantity: item.cartQuantity ?? 1,
            } as TCartStoreItem,
          ],
        })),
      removeFromCart: (asin) =>
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem.asin !== asin),
        })),
      increaseQuantity: (asin) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.asin === asin
              ? {
                  ...cartItem,
                  cartQuantity: (cartItem.cartQuantity ?? 0) + 1,
                }
              : cartItem,
          ),
        })),
      decreaseQuantity: (asin) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.asin === asin
              ? {
                  ...cartItem,
                  cartQuantity: (cartItem.cartQuantity ?? 0) - 1,
                }
              : cartItem,
          ),
        })),
      clearCart: () => set({ cart: [], coupon: "" }),

      coupon: "",
      couponIsValid: () => {
        const { coupon } = get();
        return VALID_COUPONS.includes(coupon && coupon.toLowerCase());
      },
      setCouponValue: (value) => {
        for (const coupon in VALID_COUPONS) {
          if (coupon.toLowerCase() === value) {
            if (value.toLowerCase() === "25off") {
              set({
                coupon: value,
                getTotalValue: () => get().getTotalValue() * 0.75,
              });
            } else if (value.toLowerCase() === "50off") {
              set({
                coupon: value,
                getTotalValue: () => get().getTotalValue() * 0.5,
              });
            }
            return;
          }
          set({ coupon: value });
        }
      },
    }),
    { name: "cart" },
  ),
);
