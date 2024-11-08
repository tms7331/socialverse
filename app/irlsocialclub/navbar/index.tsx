'use client';
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
import { HEADER_LOGO_SIZE } from '@/shell/header';
import { FC } from 'react';
import { usePathname } from 'next/navigation';

const Navbar: FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex flex-row items-start gap-4 grow">
      <div
        className="flex items-center justify-between gap-4 text-white"
        style={{ height: HEADER_LOGO_SIZE }}
      >
        <div>{'>'}</div>
        <Link href="/foundersocial" className="flex items-center gap-2">
          <span className="text-xl font-bold">IRL Social Club</span>
        </Link>
      </div>
      <nav className={cx('relative', 'flex flex-col items-end grow gap-4')}>
        <div className="flex h-16 items-center container mx-auto px-4">
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
              <span
                className={cx('text-base text-muted-foreground', 'text-white')}
              >
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
                {(
                  [
                    ['account', 'Account'],
                    ['explore', 'Explore'],
                    ['curated', 'Curated'],
                    ['create', 'Create'],
                    ['myevents', 'My Events']
                  ] as const
                ).map(([key, label]) => {
                  const href = `/irlsocialclub/${key}`;
                  const isActive = pathname === href;
                  return (
                    <DropdownMenuItem key={key} asChild>
                      <Link href={href} className="w-full">
                        <Button variant={isActive ? 'default' : 'ghost'}>
                          {label}
                        </Button>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <hr className="border-b-px border-white opacity-20" />
      </nav>
    </div>
  );
};

export default Navbar;
