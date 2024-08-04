" user server";

import prisma from "@/lib/db";

export async function userOrderExists() {
  return (await prisma.order.findFirst({})) !== null;
}
