import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

const LoginBtn = () => {
  return (
    <Button>
      <Link href="/login">Login</Link>
    </Button>
  );
};

export default LoginBtn;
