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
import { FC } from 'react';
import { usePathname } from 'next/navigation';

const Navbar: FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav
      className={cx('relative', 'flex flex-col items-end grow gap-6 -top-1.5')}
    >
      <div className="ml-auto flex flex-row items-center gap-6">
        {session ? (
          <div className="flex flex-row items-center gap-2">
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
          </div>
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
          <DropdownMenuContent align="end" className='justify-end'>
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
                    <Button variant={isActive ? 'default' : 'ghost'} className="w-full" >
                      {label}
                    </Button>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
