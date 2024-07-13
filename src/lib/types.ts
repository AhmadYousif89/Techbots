import { Category } from '@/app/products/_lib/types';

type Cart = {
  id: number;
  user: User;
  userId: number;
  quantity: number;
  total: number;
  date: Date;
};

type User = {
  id: number;
  email: string;
  name?: string;
  password?: string;
  image?: string;
  Cart?: Cart;
};
