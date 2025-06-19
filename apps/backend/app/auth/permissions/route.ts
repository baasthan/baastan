import corsHeaders from "@/constants/corsHeader";
import errorCodes from "@/constants/errorCodes";
import { getUserPermissions } from "@/services/user-permissions";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(errorCodes.UNAUTHENTICATED.body, {
      status: errorCodes.UNAUTHENTICATED.init.status,
      headers: { ...corsHeaders },
    });
  }

  const roles = await getUserPermissions(userId);
  return NextResponse.json({ roles });
}
