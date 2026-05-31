import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";

import { ensureUserByClerkId } from "@/app/(protected)/user/lib/utils";

type ClerkEmailAddress = {
  id?: string;
  email_address?: string;
};

async function resolveEmailAddress(
  clerkUserId: string,
  emailAddresses?: ClerkEmailAddress[],
  primaryEmailAddressId?: string,
) {
  if (Array.isArray(emailAddresses) && emailAddresses.length > 0) {
    const primaryEmail = emailAddresses.find(
      (address) => address.id === primaryEmailAddressId,
    )?.email_address;
    if (primaryEmail) return primaryEmail;
    const firstEmail = emailAddresses[0]?.email_address;
    if (firstEmail) return firstEmail;
  }

  const client = clerkClient();
  const user = await client.users.getUser(clerkUserId);

  return (
    user.emailAddresses.find(
      (address) => address.id === user.primaryEmailAddressId,
    )?.emailAddress ?? user.emailAddresses[0]?.emailAddress
  );
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", { status: 400 });
  }

  // Get type of the webhook
  const eventType = evt.type;
  console.log(
    `\n===================\nClerk Webhook type: ${eventType}\n===================\n`,
  );

  type UserCreatedEventData = {
    id?: string;
    email_addresses?: ClerkEmailAddress[];
    image_url?: string;
    username?: string;
    primary_email_address_id?: string;
  };

  if (eventType === "user.created") {
    const {
      id,
      email_addresses,
      image_url,
      username,
      primary_email_address_id,
    } = evt.data as UserCreatedEventData;

    const email = id
      ? await resolveEmailAddress(id, email_addresses, primary_email_address_id)
      : undefined;

    if (!id || !email) {
      return new Response("Error occured -- missing data", { status: 400 });
    }

    console.log(`User created: ${id}`);
    const user = {
      clerkUserId: id,
      email,
      ...(image_url ? { imageUrl: image_url } : {}),
      ...(username ? { username } : {}),
    };

    await ensureUserByClerkId(user.clerkUserId, {
      email: user.email,
      ...(user.imageUrl ? { imageUrl: user.imageUrl } : {}),
      ...(user.username ? { username: user.username } : {}),
    });
  }

  return new Response("", { status: 200 });
}
