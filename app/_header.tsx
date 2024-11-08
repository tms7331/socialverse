'use client';
import Link from 'next/link';
import Image from 'next/image';

import type { FC } from 'react';
const LOGO_SIZE = 28;

export const Header: FC = () => {
  return (
    <header>
      <Link
        className="flex flex-row items-center gap-2"
        href="/"
        style={{ height: LOGO_SIZE }}
      >
        <Image
          src="logo-light.svg"
          alt="logo"
          width={LOGO_SIZE}
          height={LOGO_SIZE}
        />
        <h1 className="text-3xl font-bold font-title">
          Welcome to SocialVerse
        </h1>
      </Link>
    </header>
  );
};
