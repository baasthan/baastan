import AccessDenied from "@/app/access-denied/page";
import CreateBlogForm from "@/components/blogs/create-blog-form";
import { authClient } from "@/lib/auth-client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
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
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={75} className="p-4 ">
          <CreateBlogForm />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} className="p-4">
          Rendered Output
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;
