"use client";
import React from "react";
import Footer from "./footer";
import Header from "./header";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <Header />
      <main className="w-full  flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default AppShell;
