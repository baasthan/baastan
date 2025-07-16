import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import Link from "next/link";
import AccessDenied from "../access-denied/page";

export default async function Page() {
  const { data, error } = await authClient.admin.hasPermission({
    permissions: {
      appDashBoard: ["view"],
    },
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!(data && data.success) || error) {
    return AccessDenied();
  }

  // Check if user has dashboard access permission

  return (
    <div className="flex container mx-auto items-center gap-2 min-h-svh">
      <Link
        href="/dashboard/survey"
        className="group border p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform"
      >
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors duration-200">
            Survey
          </h3>
        </div>
        <p className="text-sm text-gray-600 transition-all duration-300 group-hover:opacity-90 group-hover:-translate-y-1">
          Create Surveys
        </p>
      </Link>
      <Link
        href="/dashboard/blogs"
        className="group border p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform"
      >
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors duration-200">
            Blogs
          </h3>
        </div>
        <p className="text-sm text-gray-600 transition-all duration-300 group-hover:opacity-90 group-hover:-translate-y-1">
          Create Blogs
        </p>
      </Link>
    </div>
  );
}
