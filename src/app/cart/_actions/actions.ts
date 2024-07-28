'use server';

import prisma from '@/lib/db';
import { cache } from '@/lib/cache';
import { TCartItem } from '@/app/cart/_lib/types';
import { revalidatePath } from 'next/cache';

// Sync the local cart with the server cart
export const syncCart = cache(
  (clerkUserId: string, cart: TCartItem[]) => {
    const localCartItems = cart.map(item => ({
      productAsin: item.asin,
      quantity: item.cartQuantity,
    }));

    const cartTotalValue = cart.reduce(
      (acc, item) => acc + item.price * item.cartQuantity,
      0
    );

    // Start a transaction to ensure that all operations are atomic
    return prisma.$transaction(async prisma => {
      try {
        // Find the cart in the server
        const serverCart = await prisma.cart.findUnique({
          where: { clerkUserId },
          include: {
            cartItems: {
              where: { Cart: { clerkUserId } },
            },
          },
        });

        // If the cart is already synced, return
        if (serverCart && serverCart.isSynced) {
          console.log('Cart is in sync');
          return;
        }

        // If the cart doesn't exist, create it
        if (!serverCart) {
          console.log('Syncing with local cart...');
          const newCart = await prisma.cart.create({
            data: {
              user: { connect: { clerkUserId } },
              count: cart.length,
              totalValue: cartTotalValue,
              cartItems: {
                create: localCartItems,
              },
              isSynced: true,
            },
          });
          console.log('Local cart synced');
          return newCart;
        }

        // If the cart exists, update the cart items
        const serverCartItems = serverCart.cartItems.reduce((acc, item) => {
          acc[item.productAsin] = item.quantity;
          return acc;
        }, {} as Record<string, number>);

        const updatedCartItems = localCartItems.map(item => {
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
            item =>
              !localCartItems.some(
                localItem => localItem.productAsin === item.productAsin
              )
          )
          .map(item => item.productAsin); // Get the ASINs of the items to delete

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
          data: { totalValue: cartTotalValue, count: cart.length, isSynced: true },
        });
      } catch (error) {
        console.error(error);
      }
    });

    revalidatePath('/cart');
  },
  ['/cart', 'syncCart']
);

// Used outside the cart page to add or remove items from the cart
export const addRemoveCartItem = cache(
  (clerkUserId: string, asin: string, itemPrice: number) => {
    return prisma.$transaction(async prisma => {
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
            totalValue: itemPrice,
            cartItems: {
              create: { productAsin: asin, quantity: 1 },
            },
          },
        });
        return;
      }

      let cartCount = cart.count;
      let totalValue = cart.totalValue;

      const cartItem = await prisma.cartItem.findUnique({
        where: { cartItemId: { cartId: cart.id, productAsin: asin } },
      });

      if (cartItem) {
        await prisma.cartItem.delete({
          where: { cartItemId: { cartId: cart.id, productAsin: asin } },
        });
        totalValue -= itemPrice;
        cartCount -= 1;
      } else {
        await prisma.cartItem.create({
          data: { cartId: cart.id, productAsin: asin, quantity: 1 },
        });
        totalValue += itemPrice;
        cartCount += 1;
      }

      await prisma.cart.update({
        where: { clerkUserId },
        data: { totalValue, count: cartCount },
      });
    });
    revalidatePath('/cart');
  },
  ['/products', 'addRemoveCartItem']
);
// Used inside the cart page to increment or decrement the quantity of an item
export const updateCartItem = cache(
  async (clerkUserId: string, asin: string, itemPrice: number) => {
    await prisma.$transaction(async prisma => {
      const cart = await prisma.cart.findUnique({
        where: { clerkUserId },
        include: {
          cartItems: {
            where: { Cart: { clerkUserId } },
          },
        },
      });

      if (!cart) {
        throw new Error('Cart not found');
      }

      const cartItem = await prisma.cartItem.findUnique({
        where: { cartItemId: { cartId: cart.id, productAsin: asin } },
      });

      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      let totalValue = cart.totalValue;
      let cartCount = cart.count;

      if (cartItem.quantity === 1) {
        await prisma.cartItem.delete({
          where: { cartItemId: { cartId: cart.id, productAsin: asin } },
        });
        totalValue -= itemPrice;
        cartCount -= 1;
      } else {
        const cartItem = await prisma.cartItem.update({
          where: { cartItemId: { cartId: cart.id, productAsin: asin } },
          data: { quantity: { increment: 1 } },
        });
        totalValue += itemPrice * cartItem.quantity;
      }

      await prisma.cart.update({
        where: { clerkUserId },
        data: { totalValue, count: cartCount },
      });
    });
    revalidatePath('/cart');
  },
  ['/cart', 'updateCartItem']
);
// Used inside or outside the cart page to remove an item from the cart
export const removeCartItem = cache(
  (clerkUserId: string, asin: string, itemPrice: number) => {
    return prisma.$transaction(async prisma => {
      const cart = await prisma.cart.findUnique({
        where: { clerkUserId },
        include: {
          cartItems: {
            where: { Cart: { clerkUserId } },
          },
        },
      });

      if (!cart) {
        throw new Error('Cart not found');
      }

      const cartItem = await prisma.cartItem.findUnique({
        where: { cartItemId: { cartId: cart.id, productAsin: asin } },
      });

      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      await prisma.cartItem.delete({
        where: { cartItemId: { cartId: cart.id, productAsin: asin } },
      });

      const totalValue = cart.totalValue - itemPrice * cartItem.quantity;
      const cartCount = cart.count - 1;

      await prisma.cart.update({
        where: { clerkUserId },
        data: { totalValue, count: cartCount },
      });
    });
    revalidatePath('/cart');
  },
  ['/cart', 'removeCartItem']
);
// Used inside or outside the cart page to clear the cart
export const clearCart = cache(
  (clerkUserId: string) => {
    return prisma.$transaction(async prisma => {
      const cart = await prisma.cart.findUnique({
        where: { clerkUserId },
        include: {
          cartItems: {
            where: { Cart: { clerkUserId } },
          },
        },
      });

      if (!cart) {
        throw new Error('Cart not found');
      }

      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      await prisma.cart.update({
        where: { clerkUserId },
        data: { totalValue: 0, count: 0 },
      });
    });
    revalidatePath('/cart');
  },
  ['/cart', 'clearCart']
);
