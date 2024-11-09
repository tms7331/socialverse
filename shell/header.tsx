'use client';
import Link from 'next/link';
import Image from 'next/image';

import type { FC, PropsWithChildren } from 'react';
export const HEADER_LOGO_SIZE = 24;

export const ShellHeader: FC<PropsWithChildren & { title?: JSX.Element }> = ({
  title,
  children
}) => {
  return (
    <header className="relative">
      <div className="relative flex flex-row items-start justify-between gap-4 container px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-4 px-4">
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
          {title}
        </div>
        {children}
      </div>
      <hr className="absolute bottom-0 w-full left-0 border-b-px border-white opacity-50" />
    </header>
  );
};
