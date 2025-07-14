"use client";

import { APP_CONFIG, AUTH_CONFIG } from "@/config";
import { signOut, useSession } from "@/lib/auth-client";
import getInitials from "@/utils/getInitials";
import { Skeleton } from "@workspace/ui/components/skeleton";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

const AuthButtons = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const { data, isPending } = useSession();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (data && data.user) {
      setOpenDialog(false);
      if (searchParams.get(AUTH_CONFIG.SIGN_IN_PROMPT) === "true") {
        params.delete("sign-in-prompt");
        params.delete("redirect");
        router.replace(`?${params.toString()}`);
      }
    }
  }, [data]);

  useEffect(() => {
    if (searchParams.get(AUTH_CONFIG.SIGN_IN_PROMPT) === "true") {
      setOpenDialog(true);
    }
  }, [searchParams]);

  const handleSignOut = async () => {
    const currentUrl = window.location.href;
    const searchParams = new URLSearchParams();
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    searchParams.set("redirect", currentUrl);

    await signOut();

    setOpenDialog(true);
    router.push(`${APP_CONFIG.BASE_URL}/?${searchParams.toString()}`);
  };

  if (isPending) {
    return (
      <Skeleton className=" rounded-full">
        <Avatar>
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </Skeleton>
    );
  }
  if (data && data.user) {
    return (
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild tabIndex={0}>
          {/* <Button size={"icon"} asChild className=" cursor-pointer"> */}
          <Avatar>
            {data.user.image && <AvatarImage src={data.user.image} />}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(data.user.name)}
            </AvatarFallback>
          </Avatar>
          {/* </Button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=" flex flex-col p-2 gap-4 ">
          <DropdownMenuGroup>
            <div className="flex flex-row  items-center gap-2 p-2">
              <Avatar>
                {data.user.image && <AvatarImage src={data.user.image} />}
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(data.user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">
                  {data.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.user.email}
                </p>
              </div>
            </div>
          </DropdownMenuGroup>
          <Button variant={"link"} asChild autoFocus>
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Dialog
        modal
        open={openDialog}
        onOpenChange={(open: boolean) => {
          setOpenDialog(open);
        }}
      >
        <DialogTrigger asChild>
          <Button>Sign In / Login</Button>
        </DialogTrigger>

        <Tabs defaultValue="sign-in">
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle className="flex flex-row justify-between">
                <TabsList className=" border rounded-full">
                  <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                  <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>
                <DialogClose asChild>
                  <Button variant={"ghost"}>X</Button>
                </DialogClose>
              </DialogTitle>
            </DialogHeader>

            <TabsContent value="sign-in">
              <SignIn />
            </TabsContent>
            <TabsContent value="sign-up">
              <SignUp />
            </TabsContent>
          </DialogContent>
        </Tabs>
      </Dialog>
    </>
  );
};

export default AuthButtons;
