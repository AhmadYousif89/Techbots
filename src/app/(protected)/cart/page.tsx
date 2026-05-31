import prisma from "@/app/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CartViews } from "./_components/cart_view";
import { TabsContent } from "@/components/ui/tabs";
import { CartListView } from "./_components/cart_list";
import { CartPaymentView } from "./_components/cart_payment";
import { CartShippingView } from "./_components/cart_shipping";
import { normalizePrice } from "@/app/lib/utils";
import { TServerCart } from "./_lib/types";

export const metadata = {
  title: "Cart",
  description: "Your shopping cart.",
};

export const getServerCart = async (clerkUserId: string | null) => {
  let data: TServerCart = null;

  if (!clerkUserId) return data;

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
      totalValue: normalizePrice(cart?.totalValue || 0),
      cartItems: cartItems.map((item) => ({
        asin: item.productAsin,
        quantity: item.quantity,
        product: {
          asin: item.Product.asin,
          price: normalizePrice(item.Product.price),
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
    <CartViews>
      <TabsContent value="cart" className="max-view mx-auto">
        <CartListView getServerCart={serverCartPromise} />
      </TabsContent>

      <TabsContent value="details" className="max-view mx-auto">
        <CartShippingView />
      </TabsContent>

      <TabsContent value="payment" className="max-view mx-auto">
        <CartPaymentView />
      </TabsContent>
    </CartViews>
  );
}
