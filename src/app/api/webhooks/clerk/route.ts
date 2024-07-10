import { Webhook } from 'svix';
import { User } from '@prisma/client';
import { headers } from 'next/headers';
import { addUserToDB } from '@/lib/users';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
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
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', { status: 400 });
  }

  // Get type of the webhook
  const eventType = evt.type;
  console.log(
    `\n===================\nClerk Webhook type: ${eventType}\n===================\n`
  );
  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, username } = evt.data;

    if (!id || !email_addresses) {
      return new Response('Error occured -- missing data', { status: 400 });
    }

    console.log(`User created: ${id}`);
    const user = {
      clerkUserId: id,
      email: email_addresses[0].email_address,
      ...(image_url ? { imageUrl: image_url } : {}),
      ...(username ? { username } : {})
    };

    await addUserToDB(user as User);
  }

  return new Response('', { status: 200 });
}
