import { getRolesByUserId } from "@/repository/roles";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, message: "UNAUTHENTICATED" });
  }

  const roles = await getRolesByUserId(userId);
  return NextResponse.json({ roles });
}
