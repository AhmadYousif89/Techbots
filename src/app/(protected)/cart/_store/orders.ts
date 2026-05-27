import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TCartItem } from "../_lib/types";
import { type ShippingForm } from "./shipping_form";

export type TOrder = {
  id: string;
  userId: string;
  items: TCartItem[];
  shippingInfo: ShippingForm;
  total: number;
};

type OrderStore = {
  orders: TOrder[];
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (): OrderStore => ({
      orders: [],
    }),
    { name: "orders" },
  ),
);

export function creatOrder(order: TOrder) {
  useOrderStore.setState((state) => ({ orders: [...state.orders, order] }));
}

export function deleteOrder(id: string) {
  useOrderStore.setState((state) => ({
    orders: state.orders.filter((order) => order.id !== id),
  }));
}

export function clearOrders() {
  useOrderStore.setState({ orders: [] });
}
