import AccessDenied from "@/app/access-denied/page";
import CreateBlogForm from "@/components/blogs/create-blog-form";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

const Page = async () => {
  const { data, error } = await authClient.admin.hasPermission({
    permissions: {
      blogs: ["insert"],
    },
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!(data && data.success) || error) {
    return AccessDenied();
  }

  return (
    <div className="flex flex-col container mx-auto pt-16">
      <CreateBlogForm />
    </div>
  );
};

export default Page;
