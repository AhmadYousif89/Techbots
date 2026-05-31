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

    // Start a transaction to ensure that all operations are atomic
    await prisma.$transaction(async (prisma) => {
      // Find the cart in the server
      const serverCart = await prisma.cart.findUnique({
        where: { clerkUserId },
        include: {
          cartItems: {
            where: { Cart: { clerkUserId } },
          },
        },
      });

      // Return if the cart is already synced
      if (serverCart && serverCart.isSynced) {
        console.log("Cart is already synced");
        return;
      }

      // If the cart doesn't exist, create it
      if (!serverCart) {
        console.log("Creating a new server cart...");
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
        console.log("Local cart synced");
        return;
      }

      console.log("Syncing with server cart...");
      // If the cart exists, update the cart items
      const serverCartItems = serverCart.cartItems.reduce(
        (acc, item) => {
          acc[item.productAsin] = item.quantity;
          return acc;
        },
        {} as Record<string, number>,
      );

      const updatedCartItems = localCartItems.map((item) => {
        const serverQuantity = serverCartItems[item.productAsin] || 0;
        return {
          cartId: serverCart.id,
          productAsin: item.productAsin,
          quantity: serverQuantity + item.quantity,
        };
      });

      // Find the items that are in the server cart but not in the local cart
      const deletedCartItems = serverCart.cartItems
        .filter(
          (item) =>
            !localCartItems.some(
              (localItem) => localItem.productAsin === item.productAsin,
            ),
        )
        .map((item) => item.productAsin); // Get the ASINs of the items to delete

      // Delete the items that are in the server cart but not in the local cart
      await prisma.cartItem.deleteMany({
        where: {
          cartId: serverCart.id,
          productAsin: { in: deletedCartItems },
        },
      });

      // Create or update the items in the server cart
      await prisma.cartItem.createMany({
        data: updatedCartItems,
        skipDuplicates: true,
      });

      // Update the total value and count of the cart
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
