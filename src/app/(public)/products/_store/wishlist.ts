import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TProduct } from "@/app/lib/types";

type WishlistState = {
  wishlist: TProduct[];
};

export const useWishlistStore = create<WishlistState>()(
  persist(() => ({ wishlist: [] as TProduct[] }), { name: "wishlist" }),
);

export function addItemToWishlist(item: TProduct) {
  useWishlistStore.setState((s) => ({ wishlist: [...s.wishlist, item] }));
}

export function removeItemFromWishlist(asin: string) {
  useWishlistStore.setState((s) => ({
    wishlist: s.wishlist.filter((item) => item.asin !== asin),
  }));
}

export function clearWishlist() {
  useWishlistStore.setState({ wishlist: [] });
}
