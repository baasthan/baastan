import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-between min-h-svh">
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
    </div>
  );
}
