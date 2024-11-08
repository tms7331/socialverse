import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/irlsocial/Navbar";
import "@/css/globals.css";

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
