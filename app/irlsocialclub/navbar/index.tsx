'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cx } from 'class-variance-authority';

interface NavbarProps {
  session?: {
    user?: {
      name?: string;
      image?: string;
    };
    googleId?: string;
  };
}

// export default function Navbar({ session }: NavbarProps = {}) {
const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className={cx('relative')}>
      <div className="flex h-16 items-center container mx-auto px-4">
        <div className="flex items-center space-x-4">
          <Link href="/irlsocialclub" className="flex items-center space-x-2">
            <span className="text-xl font-bold">IRL Social Club</span>
          </Link>
        </div>
        <div className="ml-auto flex flex-col items-center space-x-4">
          {session ? (
            <>
              <span className="text-base text-muted-foreground">
                Welcome, {session.user?.name}
              </span>
              <Avatar>
                <AvatarImage
                  src={session.user?.image || ''}
                  alt={session.user?.name || ''}
                />
                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <span className={cx('text-base text-muted-foreground', 'text-white')}>
              Please log in to see your profile
            </span>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/irlsocialclub/account" className="w-full">
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/irlsocialclub/explore" className="w-full">
                  Explore
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/irlsocialclub/curated" className="w-full">
                  Curated
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/irlsocialclub/create" className="w-full">
                  Create
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/irlsocialclub/myevents" className="w-full">
                  My Events
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <hr className='border-b-px border-white opacity-20'/>
    </nav>
  );
};

export default Navbar;
