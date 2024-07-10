' user server';

import prisma from '@/lib/db';

export async function userOrderExists(email: string) {
  return (await prisma.order.findFirst({})) !== null;
}
