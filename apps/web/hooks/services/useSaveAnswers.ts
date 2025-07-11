import { BACKEND_API_HOST } from "@/constants/services";
import { SaveAnswerSchema } from "@workspace/schema/answer";
import { ApiResponse } from "@workspace/schema/response";
import { toast } from "sonner";
import useService from "../useService";

const useSaveAnswers = () => {
  const SAVE_QUESTIONIARE_URL = `${BACKEND_API_HOST}/survey/user-questions`;

  const { data, error, execute, resetService, isLoading, isSuccess } =
    useService({
      callback: saveAnswers,
    });

  async function saveAnswers(answers: SaveAnswerSchema) {
    const response = await fetch(SAVE_QUESTIONIARE_URL, {
      method: "POST",
      body: JSON.stringify(answers),
    });
    const responseData = (await response.json()) as ApiResponse<undefined>;
    console.log("responseData===>", responseData);
    if (responseData.success) {
      toast.success("Survey saved successful");
      return (responseData.data || true) as boolean;
    }
    toast.error("Failed to save survey");
    throw new Error(responseData.message || "Something went wrong");
  }

  return { data, execute, error, isLoading, isSuccess, resetService };
};

export default useSaveAnswers;
