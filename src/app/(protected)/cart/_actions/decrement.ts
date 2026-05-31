"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { normalizePrice } from "@/app/lib/utils";

// Used inside the cart page to decrement the quantity of an item
export const decrementServerCartItem = async (
  clerkUserId: string,
  asin: string,
  itemPrice: unknown,
) => {
  const normalizedItemPrice = normalizePrice(itemPrice);

  await prisma.$transaction(async (prisma) => {
    const cart = await prisma.cart.findUnique({
      where: { clerkUserId },
      include: {
        cartItems: {
          where: { Cart: { clerkUserId } },
        },
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItem = cart.cartItems.find((item) => item.productAsin === asin);
    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    let totalValue = normalizePrice(cart.totalValue);
    totalValue -= normalizedItemPrice;

    if (cartItem.quantity === 1) {
      await prisma.cartItem.delete({
        where: { cartItemId: { cartId: cart.id, productAsin: asin } },
      });
      await prisma.cart.update({
        where: { clerkUserId },
        data: { totalValue, count: { decrement: 1 } },
      });
      console.log("Item decremented and removed from cart");
      return;
    }

    await prisma.cartItem.update({
      where: { cartItemId: { cartId: cart.id, productAsin: asin } },
      data: { quantity: { decrement: 1 } },
    });

    await prisma.cart.update({
      where: { clerkUserId },
      data: { totalValue },
    });
    console.log("Item decremented");
  });

  revalidatePath("/cart");
};
