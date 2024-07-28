import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TCartItem } from '../_lib/types';
import { type ShippingForm } from './shipping_form';

export type TOrder = {
  id: string;
  userId: string;
  items: TCartItem[];
  shippingInfo: ShippingForm;
  total: number;
};

type OrderStore = {
  orders: TOrder[];
  totalValue: () => number;
  creatOrder: (order: TOrder) => void;
  deleteOrder: (id: string) => void;
  clearOrders: () => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      creatOrder: order => set(state => ({ orders: [...state.orders, order] })),
      deleteOrder: id =>
        set(state => ({ orders: state.orders.filter(o => o.id !== id) })),
      totalValue: () => {
        const { orders } = get();
        return orders.reduce((acc, o) => acc + o.total, 0);
      },
      clearOrders: () => set({ orders: [] }),
    }),
    { name: 'orders' }
  )
);
