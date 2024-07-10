import { create } from 'zustand';
import { ShippingForm } from '../_components/cart_shipping';

type ShippingFormState = {
  data: ShippingForm;
  setFormData: (data: ShippingForm | null) => void;
};

const initData: ShippingForm = {
  firstname: '',
  lastname: '',
  mainAddress: '',
  optionalAddress: '',
  city: '',
  phone: 0,
  shipping: 'free'
};

export const useShippingFormStore = create<ShippingFormState>(set => ({
  data: initData,
  setFormData: data => {
    if (data) set({ data });
    else set({ data: initData });
  }
}));
