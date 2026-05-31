"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { normalizePrice } from "@/app/lib/utils";

// Used inside or outside the cart page to remove an item from the cart
export const removeFromServerCart = async (
  clerkUserId: string,
  asin: string,
  itemPrice: unknown,
) => {
  const normalizedItemPrice = normalizePrice(itemPrice);

  await prisma.$transaction(async (prisma) => {
    console.log("Remove item from cart");
    const user = await prisma.user.findUnique({ where: { clerkUserId } });
    if (!user) {
      throw new Error("User not found");
    }

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

    const cartItem = await prisma.cartItem.findUnique({
      where: { cartItemId: { cartId: cart.id, productAsin: asin } },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    await prisma.cartItem.delete({
      where: { cartItemId: { cartId: cart.id, productAsin: asin } },
    });

    const isLastOne = cart.count === 0;
    if (isLastOne) {
      await prisma.cart.update({
        where: { clerkUserId },
        data: { totalValue: 0, count: 0 },
      });
      console.log("Item removed from cart and cart cleared");
      // revalidatePath("/products/[asin]", "page");
      return;
    }

    const totalValue =
      normalizePrice(cart.totalValue) - normalizedItemPrice * cartItem.quantity;
    await prisma.cart.update({
      where: { clerkUserId },
      data: { totalValue, count: { decrement: 1 } },
    });
    console.log("Item removed from cart");
  });

  revalidatePath("/products/[asin]", "page");
};
