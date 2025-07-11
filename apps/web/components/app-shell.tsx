"use client";
import React from "react";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      {/* <header className="sticky top-0 bg-white z-10">
        <TopNav />
      </header> */}
      <main className="w-full  flex-1">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default AppShell;
