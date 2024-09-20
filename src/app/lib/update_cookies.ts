import { getCookie, setCookie } from "cookies-next";

export function updateCookies(
  options: Record<string, any>,
  cookieName = "searchParams",
) {
  const oldCookieValue = getCookie(cookieName);
  const parsedCookie = oldCookieValue ? JSON.parse(oldCookieValue) : {};
  setCookie(cookieName, JSON.stringify({ ...parsedCookie, ...options }));
  return parsedCookie;
}
