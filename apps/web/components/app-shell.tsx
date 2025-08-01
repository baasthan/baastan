"use client";

import { Toaster } from "@workspace/ui/components/sonner";
import Footer from "./footer";
import Header from "./header";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <main className="mx-auto md:px-4 pt-8 w-full flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default AppShell;
