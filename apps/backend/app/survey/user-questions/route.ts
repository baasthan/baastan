import { getQuestionsByQuestioniareId } from "@/repository/questions";
import { NextResponse } from "next/server";

export async function GET() {
  const questions = await getQuestionsByQuestioniareId("1");
  return NextResponse.json({ questions });
}
