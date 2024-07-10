'use server';

export async function getShippingInfo(prev: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  return data;
}
