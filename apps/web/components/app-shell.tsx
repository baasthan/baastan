"use client";

import React from "react";
import TopNav from "./top-nav";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <header className="sticky top-0 bg-white z-10">
        <TopNav />
      </header>

      <main className="max-w-6xl mx-auto max-h-[calc(100svh-3.5rem)] p-2 lg:p-0">
        {children}
      </main>
      <footer></footer>
    </>
  );
};

export default AppShell;
