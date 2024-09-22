import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/user(.*)",
  "/cart(.*)",
  "/orders(.*)",
  "/checkout(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // const response = handleCookies(req);
  // Apply Clerk's protection for protected routes
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  // return response;
});

function handleCookies(req: NextRequest) {
  if (!req.nextUrl) {
    return NextResponse.next();
  }
  const urlSearchParams = Object.fromEntries(req.nextUrl.searchParams);
  const response = NextResponse.next();
  response.cookies.set({
    name: "searchParams",
    value: JSON.stringify(urlSearchParams),
  });
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
