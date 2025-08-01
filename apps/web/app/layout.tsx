import AppShell from "@/components/app-shell";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
// import "@workspace/ui/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Baasthan", template: "%s | Baasthan" },
  applicationName: "Baasthan",
  description:
    "Baasthan helps students and professionals find affordable, verified PGs and rentals through a smart, hassle-free digital housing platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-sans antialiased `}>
          <AppShell>{children}</AppShell>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
