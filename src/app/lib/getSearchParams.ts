import { cookies } from "next/headers";
import { extractSearchParams } from "./utils";

export function getSearchParams() {
  const cookieStore = cookies();
  const searchParamsCookie = cookieStore.get("searchParams");
  const searchParams = searchParamsCookie
    ? JSON.parse(searchParamsCookie.value)
    : {};
  return extractSearchParams(searchParams);
}

export type GetSearchParams = ReturnType<typeof getSearchParams>;
