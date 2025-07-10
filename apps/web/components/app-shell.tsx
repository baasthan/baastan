"use client";
import React from "react"; 
import Footer from "./footer";
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
      <main className="max-w-7xl mx-auto w-full px-4 flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default AppShell;
