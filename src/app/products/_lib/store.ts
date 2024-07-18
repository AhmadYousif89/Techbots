import { create } from 'zustand';

type FilterContentState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useFilterContentState = create<FilterContentState>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen })
}));

type FilterBrands = {
  selectedBrands: string[];
  setBrands: (value: string) => void;
  clearSelectedBrands: () => void;
};

type FilterCategory = {
  selectedCategory: string[];
  setCategory: (value: string) => void;
  clearSelectedCategory: () => void;
};

type FilterPrice = {
  min: string;
  max: string;
  setMin: (value: string) => void;
  setMax: (value: string) => void;
  clearPrice: () => void;
};

type Filter = {
  brands: FilterBrands;
  category: FilterCategory;
  price: FilterPrice;
  filterHasValue: () => boolean;
  resetFilter: () => void;
};

export const useFilter = create<Filter>((set, get) => ({
  brands: {
    selectedBrands: [],
    setBrands: value =>
      set(({ brands }) => {
        if (brands.selectedBrands.includes(value)) {
          return {
            brands: {
              ...brands,
              selectedBrands: brands.selectedBrands.filter(v => v !== value)
            }
          };
        }
        return {
          brands: { ...brands, selectedBrands: [...brands.selectedBrands, value] }
        };
      }),
    clearSelectedBrands: () =>
      set(({ brands }) => ({ brands: { ...brands, selectedBrands: [] } }))
  },
  category: {
    selectedCategory: [],
    setCategory: value =>
      set(({ category }) => {
        if (category.selectedCategory.includes(value)) {
          return {
            category: {
              ...category,
              selectedCategory: category.selectedCategory.filter(v => v !== value)
            }
          };
        }
        return {
          category: {
            ...category,
            selectedCategory: [...category.selectedCategory, value]
          }
        };
      }),
    clearSelectedCategory: () =>
      set(({ category }) => ({ category: { ...category, selectedCategory: [] } }))
  },
  price: {
    min: '',
    max: '',
    setMin: value => set(({ price }) => ({ price: { ...price, min: value } })),
    setMax: value => set(({ price }) => ({ price: { ...price, max: value } })),
    clearPrice: () => set(({ price }) => ({ price: { ...price, min: '', max: '' } }))
  },
  filterHasValue: () => {
    return (
      get().brands.selectedBrands.length > 0 ||
      get().category.selectedCategory.length > 0 ||
      get().price.min.length > 0 ||
      get().price.max.length > 0
    );
  },
  resetFilter: () => {
    get().brands.clearSelectedBrands();
    get().category.clearSelectedCategory();
    get().price.clearPrice();
  }
}));
