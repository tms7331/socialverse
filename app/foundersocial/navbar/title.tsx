'use client';
import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { FC } from 'react';
import { HEADER_LOGO_SIZE } from '@/shell/header';

export const NavTitle: FC = () => {
  return (
      <div
        className="flex items-center justify-between gap-4 text-white"
        style={{ height: HEADER_LOGO_SIZE }}
      >
        <div>{'>'}</div>
        <Link href="/foundersocial" className="flex items-center gap-2">
          <Rocket />
          <h2 className="text-2xl">Foundersocial</h2>
        </Link>
      </div>
  );
};
