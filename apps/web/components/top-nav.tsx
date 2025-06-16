import { Button } from "@workspace/ui/components/button";
import { Menu, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import Logo from "../public/logo.svg";
import AuthButton from "./auth-buttons";
const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b p-2 w-full">
      <nav className="flex flex-row justify-between mx-auto max-w-6xl">
        <Link
          href="/"
          className="flex flex-row text-2xl font-semibold items-center gap-1"
        >
          <Image src={Logo} alt="Baasthan" className="h-7 w-7" />
          <span className="text-primary">Baasthan</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <Plus className="rotate-45" /> : <Menu />}
        </Button>
        <div className="hidden lg:flex flex-row items-center gap-2">
          <Button variant="link" asChild>
            <Link href="/about">About Us</Link>
          </Button>

          <Button variant="link" asChild>
            <Link href="/contact">Contacts</Link>
          </Button>
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col items-start px-4">
          <Button variant="link" asChild>
            <Link href="/about">About Us</Link>
          </Button>

          <Button variant="link" className="block" asChild>
            <Link href="/contact">Contacts</Link>
          </Button>
          <div className="flex flex-row gap-2 px-4">
            <Suspense>
              <AuthButton />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
