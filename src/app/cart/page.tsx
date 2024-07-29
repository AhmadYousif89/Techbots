import prisma from '@/lib/db';
import { CartViews } from '@/app/cart/_components/cart_view';

export const metadata = {
  title: 'Cart',
  description: 'Your shopping cart.',
};

export const getServerCart = async (userId: string) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { clerkUserId: userId },
      include: {
        cartItems: {
          include: {
            Product: true,
          },
        },
      },
    });
    return cart?.cartItems;
  } catch (error) {
    console.error(`Error getting cart items for userId: ${userId}\n`, error);
  }
};

export type ServerCartItems = NonNullable<Awaited<ReturnType<typeof getServerCart>>>;

export default async function CartPage() {
  return (
    <main className='min-h-svh'>
      <CartViews />
    </main>
  );
}
