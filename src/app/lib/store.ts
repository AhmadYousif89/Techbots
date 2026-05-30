import { create } from "zustand";

type MenuStoreState = {
  sideMenuOpen: boolean;
  cartMenuOpen: boolean;
  wishlistMenuOpen: boolean;
};

export const useMenuStore = create<MenuStoreState>(() => ({
  sideMenuOpen: false,
  cartMenuOpen: false,
  wishlistMenuOpen: false,
}));

export function setSideMenuOpen(isOpen: boolean) {
  useMenuStore.setState({ sideMenuOpen: isOpen });
}

export function setCartMenuOpen(isOpen: boolean) {
  useMenuStore.setState({ cartMenuOpen: isOpen });
}

export function setWishlistMenuOpen(isOpen: boolean) {
  useMenuStore.setState({ wishlistMenuOpen: isOpen });
}
