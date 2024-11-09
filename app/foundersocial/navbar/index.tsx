'use client';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';

function useDeviceType() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

export default function Component() {
  const { data: session } = useSession();
  const isMobile = useDeviceType();
  const pathname = usePathname();

  const navItems = [
    { href: '/foundersocial/account', label: 'Account' },
    { href: '/foundersocial/explore', label: 'Explore' },
    { href: '/foundersocial/create', label: 'Create' },
    { href: '/foundersocial/myevents', label: 'My Events' }
  ];

  const UserInfo = () => (
    <div className="flex items-center mr-4">
      {session ? (
        <>
          <span className="text-base text-muted-foreground mr-2 mt-0.5">
            Welcome, {session.user?.name}
          </span>
        </>
      ) : (
        <span className="text-base text-muted-foreground">
          Please log in to see your profile
        </span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-end grow gap-4">
      {session ? (
        !isMobile ? (
          <nav className="flex items-center justify-end space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant={pathname === item.href ? 'default' : 'ghost'}>
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <UserInfo />
              </div>
              {navItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>
                    <Button variant="ghost" className="w-full justify-start">
                      {item.label}
                    </Button>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      ) : null}

      <UserInfo />
    </div>
  );
}
