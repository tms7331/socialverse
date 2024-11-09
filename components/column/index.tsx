import { cx } from 'class-variance-authority';
import { ClassValue } from 'class-variance-authority/types';
import type { FC, HTMLAttributes } from 'react';
export type TComponentsColumnProps = HTMLAttributes<HTMLDivElement> & {
  classValue?: ClassValue;
};
export const ComponentsColumn: FC<TComponentsColumnProps> = ({
  children,
  classValue,
  ...props
}) => {
  return (
    <div
      className={cx(
        'flex flex-col items-stretch',
        'py-12 lg:py-14',
        classValue
      )}
      {...props}
    >
      {children}
    </div>
  );
};
