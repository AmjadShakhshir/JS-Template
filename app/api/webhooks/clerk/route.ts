import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { createClerkClient } from "@clerk/nextjs/server";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

// Webhook event type
interface WebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    [key: string]: unknown;
  };
}

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = await headers();
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
  const wh = new Webhook(webhookSecret);

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
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Handle the webhook
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const userEmail = evt.data.email_addresses?.[0]?.email_address;
    const adminEmail = process.env.ADMIN_EMAIL;

    console.log(`New user created: ${userEmail}`);
    
    // If the user email doesn't match admin email, delete the user
    if (userEmail !== adminEmail) {
      try {
        const clerkClient = createClerkClient({
          secretKey: process.env.CLERK_SECRET_KEY!,
        });
        
        await clerkClient.users.deleteUser(id);
        console.log(`Deleted unauthorized user: ${userEmail}`);
        
        return NextResponse.json({
          message: "Unauthorized user deleted",
          userEmail,
          reason: "Only admin users are allowed"
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({
          error: "Failed to delete unauthorized user"
        }, { status: 500 });
      }
    } else {
      console.log(`Admin user created successfully: ${userEmail}`);
    }
  }

  return NextResponse.json({ message: "Webhook received" });
}
