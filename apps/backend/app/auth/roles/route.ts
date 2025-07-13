import getCorsHeaders from "@/constants/corsHeader";
import { auth } from "@/lib/auth";
import { getRolesByUserId } from "@/repository/roles";

import { NETWORK_ERROR_CODES } from "@workspace/constants/errorCodes";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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

  const roles = await getRolesByUserId(session.user.id);
  return NextResponse.json(
    { roles },
    { headers: { ...getCorsHeaders("GET") } }
  );
}
