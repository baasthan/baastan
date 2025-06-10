import getCorsHeaders from "@/constants/corsHeader";
import { getRolesByUserId } from "@/repository/roles";
import { auth } from "@clerk/nextjs/server";
import { NETWORK_ERROR_CODES } from "@workspace/constants/errorCodes";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHENTICATED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHENTICATED.init.status,
      headers: { ...getCorsHeaders("GET") },
    });
  }

  const roles = await getRolesByUserId(userId);
  return NextResponse.json(
    { roles },
    { headers: { ...getCorsHeaders("GET") } }
  );
}
