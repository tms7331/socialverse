import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/app/foundersocial/navbar';
import '@/css/globals.css';
import { ShellHeader } from '@/shell/header';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ShellHeader>
        <Navbar />
      </ShellHeader>

      {children}
      <Toaster />
    </AuthProvider>
  );
}
