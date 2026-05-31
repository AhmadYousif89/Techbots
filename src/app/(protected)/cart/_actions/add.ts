"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { normalizePrice } from "@/app/lib/utils";
import { ensureUserByClerkId } from "../../user/lib/utils";

// Used outside the cart page to add items to the cart
export const addServerCartItem = async (
  clerkUserId: string,
  asin: string,
  itemPrice: unknown,
) => {
  const normalizedItemPrice = normalizePrice(itemPrice);

  await ensureUserByClerkId(clerkUserId);

  await prisma.$transaction(async (prisma) => {
    console.log("Add item to cart");
    const cart = await prisma.cart.findUnique({
      where: { clerkUserId },
      include: {
        cartItems: {
          where: { Cart: { clerkUserId } },
        },
      },
    });

    if (!cart) {
      await prisma.cart.create({
        data: {
          clerkUserId,
          count: 1,
          totalValue: normalizedItemPrice,
          cartItems: {
            create: { productAsin: asin, quantity: 1 },
          },
        },
      });
      console.log("Cart created and item added");
      return;
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { cartItemId: { cartId: cart.id, productAsin: asin } },
    });

    if (!cartItem) {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productAsin: asin, quantity: 1 },
      });
    }

    const totalValue = normalizePrice(cart.totalValue) + normalizedItemPrice;

    await prisma.cart.update({
      where: { clerkUserId },
      data: { totalValue, count: { increment: 1 } },
    });
    console.log("Item added to cart");
  });

  revalidatePath("/products/[asin]", "page");
};
