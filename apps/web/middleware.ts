import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { Permission } from "@workspace/schema/permission";
import { NextResponse } from "next/server";
import { BACKEND_API_HOST } from "./constants/services";
import { hasPermission } from "./lib/hasPermission";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, getToken } = await auth();
  const token = await getToken();
  const response = await fetch(`${BACKEND_API_HOST}/auth/permissions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (isProtectedRoute(req)) {
    if (!userId) {
      return redirectToSignIn();
    }
    if (!response.ok) {
      return NextResponse.error();
    }
    const { roles } = await response.json();
    const permissions: Permission[] = roles;
    const resource = req.nextUrl.pathname.replace(
      /^\/|\/+/g,
      (match, offset) => (offset === 0 ? "" : ".")
    );
    const isAuthorized = hasPermission(resource, "select", permissions);
    if (!isAuthorized) {
      return NextResponse.rewrite(new URL("/error", req.url));
    }
    return NextResponse.next();
    // Add custom logic to run before redirecting
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
