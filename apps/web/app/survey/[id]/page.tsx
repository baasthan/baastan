import SurveyForm from "@/components/questions-components/survey-form";
import { BACKEND_API_HOST } from "@/constants/services";
import { NETWORK_ERROR_CODES } from "@workspace/constants/errorCodes";
import { Survey } from "@workspace/schema/questions";
import { ApiResponse } from "@workspace/schema/response";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (typeof id !== "string") {
    return <div>Error</div>;
  }
  const response = await fetch(
    `${BACKEND_API_HOST}/survey/user-questions?id=${id}`
  );

  const responseBody: ApiResponse<Survey> = await response.json();
  if (!responseBody.success) {
    if (responseBody.message === NETWORK_ERROR_CODES.NOT_FOUND.body.message) {
      return notFound();
    }
    throw new Error("Something went wrong");
  }

  const { data: survey } = responseBody;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold  text-center text-indigo-700">
          {survey.surveyText}
        </h1>
        <h3 className="scroll-m-20 text-2xl  font-semibold tracking-tight text-center">
          {survey.surveyDescription}
        </h3>
        <div className="mt-10">
          <SurveyForm survey={survey} />
        </div>
      </div>
    </div>
  );
}
