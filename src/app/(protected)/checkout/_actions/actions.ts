" user server";

import prisma from "@/app/lib/db";

export async function userOrderExists() {
  return (await prisma.order.findFirst({})) !== null;
}
