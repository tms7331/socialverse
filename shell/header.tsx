'use client';
import Link from 'next/link';
import Image from 'next/image';

import type { FC, PropsWithChildren } from 'react';
export const HEADER_LOGO_SIZE = 24;

export const ShellHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="flex flex-col lg:flex-row items-start gap-4 container px-4 py-8 mx-auto">
      <Link
        className="flex flex-row items-center gap-2"
        href="/"
        style={{ height: HEADER_LOGO_SIZE }}
      >
        <Image
          src="logo-light.svg"
          alt="logo"
          width={HEADER_LOGO_SIZE}
          height={HEADER_LOGO_SIZE}
        />
        <h1 className="text-2xl font-bold font-title">SocialVerse</h1>
      </Link>
      {children}
    </header>
  );
};
