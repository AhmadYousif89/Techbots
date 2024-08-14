import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TProduct } from "@/app/products/_lib/types";

type WishlistState = {
  wishlist: TProduct[];
  addItem: (item: TProduct) => void;
  removeItem: (id: string) => void;
  clearList: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addItem: (item) =>
        set((state) => ({ wishlist: [...state.wishlist, item] })),
      removeItem: (asin) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.asin !== asin),
        })),
      clearList: () => set({ wishlist: [] }),
    }),
    { name: "wishlist" },
  ),
);
