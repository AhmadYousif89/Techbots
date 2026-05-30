import prisma from "./db";
import { Prisma } from "@prisma/client";

export async function addUserToDB(data: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getUserById(id = "", clerkUserId = "") {
  if (!id && !clerkUserId) {
    throw new Error("Please provide either an id or clerkUserId");
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
