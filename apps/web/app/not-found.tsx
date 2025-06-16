import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h2 className=" text-3xl font-semibold">
        <span className="text-primary">404</span> Not Found 🧐
      </h2>

      <Button variant={"link"} asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
