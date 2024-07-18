import { create } from 'zustand';

type SideMenuState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useSideMenuState = create<SideMenuState>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen })
}));

type CartMenuState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useCartMenuState = create<CartMenuState>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen })
}));

type WishlistMenuState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useWishlistMenuState = create<WishlistMenuState>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen })
}));
