'use client';
import Link from 'next/link';
import { FC } from 'react';
import { HEADER_LOGO_SIZE } from '@/shell/header';

export const IrlsocialclubNavTitle: FC = () => {
  return (
    <div
      className="flex items-center justify-between gap-4 text-white"
      style={{ height: HEADER_LOGO_SIZE }}
    >
      <div>{'>'}</div>
      <Link href="/irlsocialclub" className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">IRL Social Club</h2>
      </Link>
    </div>
  );
};
