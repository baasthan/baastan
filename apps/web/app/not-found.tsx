import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h2 className=" text-3xl font-semibold">Not Found 🧐</h2>

      <Link href="/">Return Home</Link>
    </div>
  );
}
