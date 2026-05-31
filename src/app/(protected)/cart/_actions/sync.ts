"use server";

import prisma from "@/app/lib/db";
import { TCartItem } from "../_lib/types";
import { normalizePrice } from "@/app/lib/utils";
import { ensureUserByClerkId } from "../../user/lib/utils";

// Sync the local cart with the server cart
export const syncCart = async (clerkUserId: string, cart: TCartItem[]) => {
  const localCartItems = cart.map((item) => ({
    productAsin: item.asin,
    quantity: item.cartQuantity,
  }));

  const cartTotalValue = cart.reduce(
    (acc, item) => acc + normalizePrice(item.price) * item.cartQuantity,
    0,
  );

  try {
    await ensureUserByClerkId(clerkUserId);

    // Replace the server snapshot so the server cart always matches the local cart.
    await prisma.$transaction(async (prisma) => {
      const serverCart = await prisma.cart.findUnique({
        where: { clerkUserId },
        select: { id: true },
      });

      if (!serverCart) {
        if (localCartItems.length) {
          await prisma.cart.create({
            data: {
              clerkUserId,
              count: cart.length,
              totalValue: cartTotalValue,
              cartItems: {
                create: localCartItems,
              },
              isSynced: true,
            },
          });
        } else {
          await prisma.cart.create({
            data: {
              clerkUserId,
              count: 0,
              totalValue: 0,
              isSynced: true,
            },
          });
        }
        return;
      }

      await prisma.cartItem.deleteMany({
        where: {
          cartId: serverCart.id,
        },
      });

      if (localCartItems.length) {
        await prisma.cartItem.createMany({
          data: localCartItems.map((item) => ({
            cartId: serverCart.id,
            ...item,
          })),
        });
      }

      await prisma.cart.update({
        where: { clerkUserId },
        data: {
          totalValue: cartTotalValue,
          count: cart.length,
          isSynced: true,
        },
      });

      console.log("Server cart synced");
    });
  } catch (error) {
    console.error(error);
  }
};
