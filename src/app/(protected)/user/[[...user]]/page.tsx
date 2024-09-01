"use client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserProfile } from "@clerk/nextjs";
import { ListChecks, MenuIcon } from "lucide-react";

export default function UserProfilePage() {
  return (
    <main className="max-view mx-auto min-h-svh max-w-screen-xl bg-background">
      <h1 className="sr-only">User Profile</h1>
      <div className="flex items-center justify-center py-8">
        <UserProfile routing="path" path="/user">
          <UserProfile.Page
            url="orders"
            label="My Orders"
            labelIcon={<ListChecks className="size-4" />}
          >
            <UserOrderSummary />
          </UserProfile.Page>
        </UserProfile>
      </div>
    </main>
  );
}

function UserOrderSummary() {
  return (
    <section>
      <CardHeader className="p-0">
        <h1 className="border-b pb-4 font-semibold">My Orders</h1>
        <CardDescription className="py-2 text-xs font-medium">
          View and manage your orders history.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-muted-foreground">
        <p className="text-center">Your order history is empty.</p>
      </CardContent>
    </section>
  );
}
