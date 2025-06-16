import getInitials from "@/utils/get-initials";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useAuth from "../hooks/use-auth";

const AuthButton = () => {
  const { isLoading, isLoggedIn, user, session, handeLogout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const handleOnClick = () => {
    const currentPath = `${pathname}?${searchParam.toString()}`;
    router.push(`/auth/login?redirectUrl=${currentPath}`);
  };

  console.log(session);

  if (isLoading) {
    return (
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground"></AvatarFallback>
      </Avatar>
    );
  }
  if (isLoggedIn && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.user_metadata.avatar_url}></AvatarImage>
            <AvatarFallback>
              {getInitials(user.user_metadata.full_name) || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-accent">
          <div className="flex flex-col items-start py-2 px-4 text-primary text-xs font-light">
            <p>{user.user_metadata.full_name}</p>
            <p className="">{user.email}</p>
          </div>

          <DropdownMenuGroup>
            <Button className="w-full " variant={"link"} asChild>
              <Link href="/profile">Profile</Link>
            </Button>

            <Button
              className="w-full text-destructive"
              variant={"link"}
              onClick={handeLogout}
            >
              Logout
            </Button>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <>
      <Button onClick={handleOnClick}>Login / Sign Up</Button>
    </>
  );
};

export default AuthButton;
