import { ShellBackground } from '@/shell/background';
import type { FC, PropsWithChildren } from 'react';

export const Shell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ShellBackground />
      <div className="relative min-h-screen text-white">{children}</div>
    </>
  );
};
