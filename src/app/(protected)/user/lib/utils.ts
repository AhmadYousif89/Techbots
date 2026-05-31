import { clerkClient } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import prisma from "@/app/lib/db";

type TClerkUserProfile = {
  email: string;
  imageUrl?: string;
  username?: string;
};

async function resolveClerkUserProfile(
  clerkUserId: string,
): Promise<TClerkUserProfile> {
  const client = clerkClient();
  const user = await client.users.getUser(clerkUserId);

  const email =
    user.emailAddresses.find(
      (address) => address.id === user.primaryEmailAddressId,
    )?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error(`Unable to resolve email for Clerk user ${clerkUserId}`);
  }

  return {
    email,
    ...(user.imageUrl ? { imageUrl: user.imageUrl } : {}),
    ...(user.username ? { username: user.username } : {}),
  };
}

export async function ensureUserByClerkId(
  clerkUserId: string,
  profile?: TClerkUserProfile,
) {
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (existingUser) return existingUser;

  const resolvedProfile =
    profile && profile.email
      ? profile
      : await resolveClerkUserProfile(clerkUserId);

  return prisma.user.upsert({
    where: { clerkUserId },
    update: {},
    create: {
      clerkUserId,
      email: resolvedProfile.email,
      ...(resolvedProfile.imageUrl
        ? { imageUrl: resolvedProfile.imageUrl }
        : {}),
      ...(resolvedProfile.username
        ? { username: resolvedProfile.username }
        : {}),
    },
  });
}

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
