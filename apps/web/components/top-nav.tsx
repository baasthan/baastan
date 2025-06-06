import { Button } from "@workspace/ui/components/button";
import { Menu, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "../public/logo.svg";
const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b p-2 ">
      <nav className="flex flex-row justify-between mx-auto max-w-6xl">
        <Link
          href="/"
          className="flex flex-row text-2xl font-semibold items-center gap-1"
        >
          <Image src={Logo} alt="Baasthan" className="h-7 w-7" />
          <span>Baasthan</span>
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

          <Button variant="link" asChild>
            <Link href="/blogs">Blogs</Link>
          </Button>

          <Button>Login</Button>
          <Button variant="outline">Sign Up</Button>
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
            <Button className="block">Login</Button>
            <Button variant="outline" className="block">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
