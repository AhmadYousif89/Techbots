import { z } from 'zod';
import { create } from 'zustand';

const validate = z.string().min(1, { message: 'Field is required' });

const shippingSchema = z.object({
  firstname: validate,
  lastname: validate,
  mainAddress: validate,
  optionalAddress: z.string().optional(),
  city: validate,
  phone: z
    .number({ coerce: true, message: 'Invalid phone number' })
    .min(1, { message: 'Field is required' }),
  shipping: z.union([z.literal('free'), z.literal('next')]),
});
export type ShippingForm = z.infer<typeof shippingSchema>;
export type ShippingFormKeys = keyof ShippingForm;

const initData: ShippingForm = {
  firstname: '',
  lastname: '',
  mainAddress: '',
  optionalAddress: '',
  city: '',
  phone: 0,
  shipping: 'free',
};

type ShippingFormState = {
  data: ShippingForm;
  setFormData: (data: ShippingForm | null) => void;
  formState: () => z.SafeParseReturnType<ShippingForm, ShippingForm>;
};

export const useShippingStore = create<ShippingFormState>((set, get) => ({
  data: initData,
  setFormData: data => {
    if (data) set({ data });
    else set({ data: initData });
  },
  formState: () => {
    try {
      return shippingSchema.safeParse(get().data);
    } catch {
      return shippingSchema.safeParse({} as ShippingForm);
    }
  },
}));
