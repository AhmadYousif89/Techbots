import prisma from "@/app/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CartViews } from "./_components/cart_view";

export const metadata = {
  title: "Cart",
  description: "Your shopping cart.",
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

export const getServerCart = async (
  clerkUserId: string | null,
): Promise<TServerCart> => {
  "use server";
  let data: TServerCart = null;

  if (!clerkUserId) {
    return data;
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { clerkUserId },
      select: {
        count: true,
        totalValue: true,
        cartItems: {
          select: {
            productAsin: true,
            quantity: true,
            Product: {
              select: {
                asin: true,
                price: true,
                title: true,
                category: true,
                mainImage: true,
                stockQuantity: true,
              },
            },
          },
        },
      },
    });

    const cartItems = cart?.cartItems || [];

    data = {
      count: cart?.count || 0,
      totalValue: cart?.totalValue || 0,
      cartItems: cartItems.map((item) => ({
        asin: item.productAsin,
        quantity: item.quantity,
        product: {
          asin: item.Product.asin,
          price: item.Product.price,
          title: item.Product.title,
          category: item.Product.category,
          mainImage: item.Product.mainImage,
          stockQuantity: item.Product.stockQuantity,
        },
      })),
    };
  } catch (error) {
    console.error(error);
  }

  return data;
};

export default function CartPage() {
  const { userId } = auth();
  const serverCartPromise = getServerCart(userId);

  return (
    <main className="min-h-svh">
      <CartViews getServerCart={serverCartPromise} />
    </main>
  );
}
