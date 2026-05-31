import prisma from "@/app/lib/db";

export async function getOrdersForUser(clerkUserId: string) {
  return prisma.order.findMany({
    where: { clerkUserId },
    orderBy: { createdAt: "desc" },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              asin: true,
              title: true,
              mainImage: true,
              price: true,
            },
          },
        },
      },
      user: {
        select: {
          email: true,
          username: true,
        },
      },
    },
  });
}

export async function getOrderForUser(clerkUserId: string, orderId: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      clerkUserId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              asin: true,
              title: true,
              mainImage: true,
              price: true,
            },
          },
        },
      },
      user: {
        select: {
          email: true,
          username: true,
        },
      },
    },
  });
}

export type OrdersForUser = Awaited<ReturnType<typeof getOrdersForUser>>;
export type UserOrder = OrdersForUser[number];
export type SingleUserOrder = Awaited<ReturnType<typeof getOrderForUser>>;
