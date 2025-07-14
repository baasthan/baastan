import { default as getCorsHeaders } from "@/constants/corsHeader";
import { getQuestionsByQuestioniareId } from "@/repository/questions";
import { saveAnswer } from "@/services/answers";
import { NETWORK_ERROR_CODES } from "@workspace/constants/errorCodes";
import { Answer } from "@workspace/schema/answer";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const id = query.get("id");
  const { success: isValid, data } = z.string().uuid().safeParse(id);
  if (!isValid) {
    return NextResponse.json(NETWORK_ERROR_CODES.BAD_REQUEST.body, {
      status: NETWORK_ERROR_CODES.BAD_REQUEST.init.status,
      headers: { ...getCorsHeaders("GET") },
    });
  }
  const survey = await getQuestionsByQuestioniareId(data);
  if (!survey) {
    return NextResponse.json(NETWORK_ERROR_CODES.NOT_FOUND.body, {
      status: NETWORK_ERROR_CODES.NOT_FOUND.init.status,
      headers: { ...getCorsHeaders("GET") },
    });
  }
  return NextResponse.json(
    { data: survey, success: true },
    { headers: { ...getCorsHeaders("GET") } }
  );
}

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const { questioniareId, response } = payload;
  const { success: isValidQuestionId, data } = z
    .string()
    .uuid()
    .safeParse(questioniareId);
  if (!isValidQuestionId) {
    return NextResponse.json(NETWORK_ERROR_CODES.BAD_REQUEST.body, {
      status: NETWORK_ERROR_CODES.BAD_REQUEST.init.status,
      headers: { ...getCorsHeaders("GET") },
    });
  }
  const parsedPayload: Record<string, Answer> = response;

  await Promise.all(
    Object.keys(parsedPayload).map((questionId: string) =>
      saveAnswer({
        questioniareId: data,
        questionId,
        answer: parsedPayload[questionId]!,
      })
    )
  );
  return NextResponse.json(
    { success: true },
    { headers: { ...getCorsHeaders("POST") } }
  );
}
