import { default as getCorsHeaders } from "@/constants/corsHeader";
import { auth } from "@/lib/auth";
import { getUserPermissions } from "@/services/user-permissions";

import { NETWORK_ERROR_CODES } from "@workspace/constants/errorCodes";
import { headers } from "next/headers";

import { NextResponse } from "next/server";

//TODO: Get a better way to send corsHeaders preferably using next config
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!(session && session.user)) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHENTICATED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHENTICATED.init.status,
      headers: { ...getCorsHeaders("GET") },
    });
  }

  const roles = await getUserPermissions(session.user.id);

  if (!roles) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHORIZED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHORIZED.init.status,
      headers: { ...getCorsHeaders("GET") },
    });
  }
  console.debug("roles===>", roles);
  return NextResponse.json(
    { roles },
    { headers: { ...getCorsHeaders("GET") } }
  );
}
