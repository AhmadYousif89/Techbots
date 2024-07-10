import { User } from '@prisma/client';
import prisma from './db';

export async function addUserToDB(data: User) {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getUserById(id: string, clerkUserId: string) {
  if (!id && !clerkUserId) {
    throw new Error('Please provide either an id or clerkUserId');
  }
  try {
    const query = id ? { id } : { clerkUserId };
    const user = await prisma.user.findUnique({ where: query });
    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
}
