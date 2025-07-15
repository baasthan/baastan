import AccessDenied from "@/app/access-denied/page";
import { authClient } from "@/lib/auth-client";
import { Button } from "@workspace/ui/components/button";
import { headers } from "next/headers";
import Link from "next/link";

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
    <div className="flex flex-col container py-10">
      <div className="flex flex-row w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/blogs/new"}>Create New</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
