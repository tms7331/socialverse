import type { Metadata } from "next";
// import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/foundersocial/Navbar";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
      <Toaster />
    </AuthProvider>
  );
}
