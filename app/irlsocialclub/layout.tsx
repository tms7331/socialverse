import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/app/irlsocialclub/navbar';
import '@/css/globals.css';
import { ShellHeader } from '@/shell/header';
import { IrlsocialclubNavTitle } from '@/app/irlsocialclub/navbar/title';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ShellHeader title={<IrlsocialclubNavTitle />}>
        <Navbar />
      </ShellHeader>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
