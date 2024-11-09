import {
  GRADIENT_MESH_LIGHT_CSS,
  RADIAL_TEAL_YELLOW_PINK
} from '@/constants/gradient/constants';
import { cx } from 'class-variance-authority';
import type { FC } from 'react';

export const ShellBackground: FC = () => {
  return (
    <>
      <div
        className={cx(
          'fixed inset-0',
          // 'blur-md'
          // 'opacity-80'
          // 'bg-red-500'
          // 'bg-background text-foreground'
        )}
        style={{
          minHeight: '100vh',
          backgroundImage: RADIAL_TEAL_YELLOW_PINK
        }}
      >
        {/* <div
          style={{ opacity: 0.4 }}
          className="fill _bi-mesh"
        /> */}

        {/* <div style={{opacity: 0.05}} className="fill inset-0 _bi-radial-inverted dark:opacity-20" /> */}
      </div>
      {/* <div
        className={cx(
          'fixed inset-0',
          'bg-white',
          'opacity-40',
          // 'backdrop-blur-lg'
          // 'bg-red-500'
          // 'bg-background text-foreground'
        )}
        // style={{
        //   ...GRADIENT_MESH_LIGHT_CSS
        // }}
      /> */}
      <div
        className={cx(
          'fixed inset-0',
          // 'opacity-50',
          // 'backdrop-blur-lg'
          // 'bg-red-500'
          // 'bg-background text-foreground'
        )}
        style={{
          ...GRADIENT_MESH_LIGHT_CSS
        }}
      />
      
    </>
  );
};
