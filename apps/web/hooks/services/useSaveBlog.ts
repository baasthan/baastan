import { BACKEND_API_HOST } from "@/constants/services";
import { CreateBlogType } from "@workspace/schema/blogs";
import { ApiResponse } from "@workspace/schema/response";
import { toast } from "sonner";
import useService from "../useService";

const useSaveBlog = () => {
  const SAVE_BLOG_URL = `${BACKEND_API_HOST}/api/blogs/dashboard`;
  const { data, error, execute, isLoading, isSuccess, resetService } =
    useService({
      callback: saveBlog,
    });

  async function saveBlog(payload: CreateBlogType) {
    const response = await fetch(SAVE_BLOG_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const responseData = (await response.json()) as ApiResponse<{
      success: boolean;
      message: string;
    }>;

    if (responseData.success) {
      toast.success("Blog saved successfully");
      return responseData.data || true;
    } else {
      toast.error("Failed to save blog");
      throw new Error(responseData.message || "Something went worng");
    }
  }

  return { data, execute, isLoading, isSuccess, error, resetService };
};

export default useSaveBlog;
