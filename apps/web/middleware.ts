import { ROUTE_PERMISSIONS_MAP } from "@/constants/routePermissions";
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

  const pathname = req.nextUrl.pathname;

  if (isProtectedRoute(req)) {
    if (!userId) {
      return redirectToSignIn();
    }
    if (!response.ok) {
      return NextResponse.rewrite(new URL("/error", req.url));
    }
    const { roles } = await response.json();
    const permissions: Permission[] = roles;
    const requiredPermission =
      ROUTE_PERMISSIONS_MAP[pathname as keyof typeof ROUTE_PERMISSIONS_MAP] ||
      undefined;

    const isAuthorized =
      requiredPermission &&
      hasPermission(
        requiredPermission.resource,
        requiredPermission.action,
        permissions
      );
    console.log("IsAuthorized===>", isAuthorized);
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
