"use client";

import { UserProfile } from "@clerk/nextjs";

import { Main } from "@/components/main";

export default function UserProfilePage() {
  return (
    <Main className="max-w-screen-xl">
      <h1 className="sr-only">User Profile</h1>
      <div className="flex items-center justify-center py-8">
        <UserProfile path="/user" routing="path" />
      </div>
    </Main>
  );
}
