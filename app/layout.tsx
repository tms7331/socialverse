import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/components/AuthProvider';
import localFont from 'next/font/local';
import { cx } from 'class-variance-authority';
import '@/css/reset.css';
import '@/css/globals.css';

import pkg from '../package.json';

const title = localFont({
  src: '../fonts/conthrax/regular.otf',
  variable: '--font-title',
  weight: '400',
  style: 'normal'
});

const slab = localFont({
  src: '../fonts/armstrong3/regular.otf',
  variable: '--font-slab',
  weight: '400',
  style: 'normal'
});

const sans = localFont({
  src: '../fonts/toxigenesis/regular.otf',
  variable: '--font-sans',
  weight: '400',
  style: 'normal'
});

import '../css/fonts.css';
import { ComponentsHead } from '@/components/head';

export const metadata: Metadata = {
  title: pkg.name.slice(0, 1).toUpperCase() + pkg.name.slice(1),
  description: pkg.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <ComponentsHead />
        <body
          className={cx(
            title.variable,
            slab.variable,
            sans.variable,
            'antialiased'
          )}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
