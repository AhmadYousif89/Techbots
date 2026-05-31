import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import prisma from "@/app/lib/db";

import { getOrdersForUser } from "./_lib/orders";
import { OrdersView } from "./_components/orders_view";

export const metadata = {
  title: "My Orders",
  description: "View your orders and track their status.",
};

export default async function OrdersPage() {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const [orders, user] = await Promise.all([
    getOrdersForUser(userId),
    prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        email: true,
        username: true,
      },
    }),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <main className="max-view mx-auto min-h-screen">
      <OrdersView orders={orders} user={user} />
    </main>
  );
}
