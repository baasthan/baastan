import { BACKEND_API_HOST } from "@/constants/services";
import { useAuth } from "@clerk/nextjs";
import { ERROR_CODES } from "@workspace/constants/errorCodes";
import { ApiResponse } from "@workspace/schema/response";
import { toast } from "@workspace/ui/components/sonner";
import useService from "../useService";

const useUpdateSurveyStatus = () => {
  const SAVE_QUESTIONIARE_URL = `${BACKEND_API_HOST}/survey/dashboard`;
  const { getToken } = useAuth();
  const { data, error, execute, resetService, isLoading, isSuccess } =
    useService({
      callback: updateSurveyStatus,
    });

  async function updateSurveyStatus(id: string, isLive: boolean) {
    const token = await getToken();
    if (!token) {
      throw new Error(ERROR_CODES.UNAUTHENTICATED);
    }
    const response = await fetch(SAVE_QUESTIONIARE_URL + `?id=${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isLive }),
    });
    const responseData = (await response.json()) as ApiResponse<{
      isLive: boolean;
    }>;
    console.log(responseData);
    if (responseData.success) {
      toast.success("Survey updated successful");
      return responseData.data;
    }
    toast.error("Failed to update survey");
    throw new Error(responseData.message || "Something went wrong");
  }

  return { data, execute, error, isLoading, isSuccess, resetService };
};

export default useUpdateSurveyStatus;
