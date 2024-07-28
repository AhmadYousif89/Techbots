import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { CartViews } from '@/app/cart/_components/cart_view';

// export const getServerCart = async (userId: string) => {
//   try {
//     const cart = await prisma.cart.findUnique({
//       where: { clerkUserId: userId },
//       include: {
//         cartItems: {
//           include: {
//             Product: true,
//           },
//         },
//       },
//     });
//     return cart?.cartItems;
//   } catch (error) {
//     console.error(`Error getting cart items for userId: ${userId}\n`, error);
//   }
// };

// export type ServerCartItems = NonNullable<Awaited<ReturnType<typeof getServerCart>>>;

export default async function CartPage() {
  // const { userId } = auth();

  // let cart: ServerCartItems = [];
  // if (userId) {
  //   cart = (await getCart(userId)) ?? [];
  // }

  return (
    <main className='min-h-svh'>
      <CartViews />
    </main>
  );
}
