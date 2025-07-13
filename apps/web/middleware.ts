import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import { APP_CONFIG, AUTH_CONFIG } from "./config";
import { createRouteMatcher } from "./utils/routeMatcher";

const publicRoutes = ["/", "/about"];
const publicMatcher = createRouteMatcher(publicRoutes);

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie && publicMatcher(request.nextUrl.href)) {
    const currentUrl = request.nextUrl.href;
    const searchParams = new URLSearchParams();
    searchParams.set("redirect", currentUrl);
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    const redirectUrl = new URL(
      `?${searchParams.toString()}`,
      APP_CONFIG.BASE_URL
    );
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
