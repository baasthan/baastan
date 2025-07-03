import { default as getCorsHeaders } from "@/constants/corsHeader";
import { getUserPermissions } from "@/services/user-permissions";
import { auth } from "@clerk/nextjs/server";
import { NETWORK_ERROR_CODES } from "@workspace/constants/errorCodes";

import { NextResponse } from "next/server";

//TODO: Get a better way to send corsHeaders preferably using next config
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHENTICATED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHENTICATED.init.status,
      headers: { ...getCorsHeaders("GET") },
    });
  }

  const roles = await getUserPermissions(userId);

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
