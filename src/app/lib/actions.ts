"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function clearCookieAndRedirect(path: string) {
  cookies().set("searchParams", JSON.stringify({}));
  redirect(path);
}
