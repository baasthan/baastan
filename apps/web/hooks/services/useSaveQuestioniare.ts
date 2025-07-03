import { BACKEND_API_HOST } from "@/constants/services";
import { useAuth } from "@clerk/nextjs";
import { ERROR_CODES } from "@workspace/constants/errorCodes";
import { CreateSurveyProps } from "@workspace/schema/questions";
import { ApiResponse } from "@workspace/schema/response";
import { toast } from "@workspace/ui/components/sonner";
import useService from "../useService";

const useSaveQuestioniare = () => {
  const SAVE_QUESTIONIARE_URL = `${BACKEND_API_HOST}/survey/dashboard/questions`;
  const { getToken } = useAuth();
  const { data, error, execute, resetService, isLoading, isSuccess } =
    useService({
      callback: saveSurvey,
    });

  async function saveSurvey(surveyData: CreateSurveyProps) {
    const token = await getToken();
    if (!token) {
      throw new Error(ERROR_CODES.UNAUTHENTICATED);
    }
    const response = await fetch(SAVE_QUESTIONIARE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(surveyData),
    });
    const responseData = (await response.json()) as ApiResponse<undefined>;
    console.log(responseData);
    if (responseData.success) {
      toast.success("Survey saved successful");
      return (responseData.data || true) as boolean;
    }
    toast.error("Failed to save survey");
    throw new Error(responseData.message || "Something went wrong");
  }

  return { data, execute, error, isLoading, isSuccess, resetService };
};

export default useSaveQuestioniare;
