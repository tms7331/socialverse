import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/app/foundersocial/navbar';
import '@/css/globals.css';
import { ShellHeader } from '@/shell/header';
import { NavTitle } from '@/app/foundersocial/navbar/title';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ShellHeader title={<NavTitle />}>
        <Navbar />
      </ShellHeader>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
