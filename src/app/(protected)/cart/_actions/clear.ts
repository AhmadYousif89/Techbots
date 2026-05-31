"use server";

import prisma from "@/app/lib/db";

// Used inside or outside the cart page to clear the cart
export const clearServerCart = async (clerkUserId: string) => {
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

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    await prisma.cart.update({
      where: { clerkUserId },
      data: { totalValue: 0, count: 0 },
    });

    console.log("Cart cleared");
  });
};
