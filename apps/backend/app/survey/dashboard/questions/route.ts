import getCorsHeaders from "@/constants/corsHeader";
import { createSurvey } from "@/services/dashboard-questioniare";
import { hasPermission } from "@/services/user-permissions";
import { auth } from "@clerk/nextjs/server";
import { NETWORK_ERROR_CODES } from "@workspace/constants/errorCodes";
import { CreateSurveySchema } from "@workspace/schema/questions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHENTICATED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHENTICATED.init.status,
      headers: { ...getCorsHeaders("POST") },
    });
  }
  const isAuthorized = await hasPermission(
    userId,
    "dashboard.survey",
    "insert"
  );

  if (!isAuthorized) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHORIZED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHORIZED.init.status,
      headers: { ...getCorsHeaders("POST") },
    });
  }

  const {
    data,
    success: parseSuccess,
    error,
  } = CreateSurveySchema.safeParse(await request.json());

  if (!parseSuccess) {
    return NextResponse.json(
      { ...NETWORK_ERROR_CODES.BAD_REQUEST.body, error },
      {
        status: NETWORK_ERROR_CODES.BAD_REQUEST.init.status,
        headers: { ...getCorsHeaders("POST") },
      }
    );
  }

  try {
    const success = await createSurvey(data);
    if (success) {
      return NextResponse.json(
        { success },
        { headers: { ...getCorsHeaders("POST") } }
      );
    }
    return NextResponse.json(
      { ...NETWORK_ERROR_CODES.INTERNAL_ERROR.body },
      {
        status: NETWORK_ERROR_CODES.INTERNAL_ERROR.init.status,
        headers: { ...getCorsHeaders("POST") },
      }
    );
  } catch (error) {
    console.error("Unable to create survey");
    console.debug(error);
    return NextResponse.json(
      { success: false },
      { headers: { ...getCorsHeaders("POST") } }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: { ...getCorsHeaders("OPTIONS") },
  });
}
