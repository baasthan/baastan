import corsHeaders from "@/constants/corsHeader";
import errorCodes from "@/constants/errorCodes";
import { createSurvey } from "@/services/dashboard-questioniare";
import { hasPermission } from "@/services/user-permissions";
import { auth } from "@clerk/nextjs/server";
import { CreateSurveySchema } from "@workspace/schema/questions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(errorCodes.UNAUTHENTICATED.body, {
      status: errorCodes.UNAUTHENTICATED.init.status,
      headers: { ...corsHeaders },
    });
  }
  const isAuthorized = await hasPermission(
    userId,
    "dashboard.questionnaire",
    "insert"
  );

  if (!isAuthorized) {
    return NextResponse.json(errorCodes.UNAUTHORIZED.body, {
      status: errorCodes.UNAUTHORIZED.init.status,
      headers: { ...corsHeaders },
    });
  }

  const {
    data,
    success: parseSuccess,
    error,
  } = CreateSurveySchema.safeParse(await request.json());

  if (!parseSuccess) {
    return NextResponse.json(
      { ...errorCodes.BAD_REQUEST.body, error },
      {
        status: errorCodes.BAD_REQUEST.init.status,
        headers: { ...corsHeaders },
      }
    );
  }

  try {
    const success = await createSurvey(data);
    return NextResponse.json({ success }, { headers: { ...corsHeaders } });
  } catch (error) {
    console.error("Unable to create survey");
    console.debug(error);
    return NextResponse.json(
      { success: false },
      { headers: { ...corsHeaders } }
    );
  }
}

export function OPTIONS() {
  console.log("Options called");
  return NextResponse.json(
    {},
    {
      headers: { ...corsHeaders },
    }
  );
}
