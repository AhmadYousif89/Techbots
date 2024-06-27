import { create } from 'zustand';

type CartMenuState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useCartMenuState = create<CartMenuState>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen })
}));
