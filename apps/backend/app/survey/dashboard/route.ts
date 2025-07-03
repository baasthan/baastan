import getCorsHeaders from "@/constants/corsHeader";
import { getSurveys, updateSurveyStatus } from "@/repository/questions";
import { hasPermission } from "@/services/user-permissions";
import { auth } from "@clerk/nextjs/server";
import { NETWORK_ERROR_CODES } from "@workspace/constants/errorCodes";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHENTICATED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHENTICATED.init.status,
      headers: { ...getCorsHeaders("GET") },
    });
  }

  const isAuthorized = await hasPermission(
    userId,
    "dashboard.survey",
    "select"
  );

  if (!isAuthorized) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHORIZED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHORIZED.init.status,
      headers: { ...getCorsHeaders("POST") },
    });
  }

  const surveys = await getSurveys();
  if (!surveys) {
    return NextResponse.json(NETWORK_ERROR_CODES.NOT_FOUND.body, {
      status: NETWORK_ERROR_CODES.NOT_FOUND.init.status,
      headers: { ...getCorsHeaders("GET") },
    });
  }

  return NextResponse.json(
    { data: surveys, success: true },
    { headers: { ...getCorsHeaders("GET") } }
  );
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHENTICATED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHENTICATED.init.status,
      headers: { ...getCorsHeaders("PUT") },
    });
  }

  const isAuthorized = await hasPermission(
    userId,
    "dashboard.survey",
    "update"
  );

  if (!isAuthorized) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHORIZED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHORIZED.init.status,
      headers: { ...getCorsHeaders("PUT") },
    });
  }

  const query = req.nextUrl.searchParams;
  const id = query.get("id");
  const { success: isValid, data } = z.string().uuid().safeParse(id);
  if (!isValid) {
    return NextResponse.json(NETWORK_ERROR_CODES.BAD_REQUEST.body, {
      status: NETWORK_ERROR_CODES.BAD_REQUEST.init.status,
      headers: { ...getCorsHeaders("PUT") },
    });
  }
  const { isLive } = await req.json();

  //TODO: GET IT FROM REQUEST
  const result = await updateSurveyStatus(data, isLive);
  if (result) {
    return NextResponse.json(
      { success: true, data: { isLive } },
      { headers: { ...getCorsHeaders("PUT") } }
    );
  } else {
    return NextResponse.json(
      { success: false },
      { headers: { ...getCorsHeaders("PUT") } }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: { ...getCorsHeaders(["OPTIONS", "PUT", "GET"]) },
  });
}
