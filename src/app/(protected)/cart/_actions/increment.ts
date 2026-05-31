"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { normalizePrice } from "@/app/lib/utils";

// Used inside the cart page to increment the quantity of an item
export const incrementServerCartItem = async (
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
          include: { Product: { select: { stockQuantity: true } } },
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
    const prodStock = cartItem.Product.stockQuantity;

    const newQuantity = Math.min(cartItem.quantity + 1, prodStock);

    await prisma.cartItem.update({
      where: { cartItemId: { cartId: cart.id, productAsin: asin } },
      data: { quantity: newQuantity },
    });

    let totalValue = normalizePrice(cart.totalValue);
    totalValue += normalizedItemPrice;

    await prisma.cart.update({
      where: { clerkUserId },
      data: { totalValue },
    });
    console.log("Item incremented");
  });

  revalidatePath("/cart");
};
