export type TCartItem = {
  asin: string;
  price: number;
  cartQuantity: number;
};

export type TCartProduct = {
  asin: string;
  title: string;
  price: number;
  category: string;
  mainImage: string;
  stockQuantity: number;
};

export type TServerCartItem = {
  asin: string;
  quantity: number;
  product: TCartProduct;
};

export type TServerCart = {
  count: number;
  totalValue: number;
  cartItems: TServerCartItem[];
} | null;

export type ShippingType = "free" | "next";
