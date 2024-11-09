import { Checkbox, TCheckboxProps } from '@/components/ui/checkbox';
import { cx } from 'class-variance-authority';
import type { FC } from 'react';

type TProps = { id: string } & TCheckboxProps;
export const CheckboxText: FC<TProps> = ({ children, id, ...props }) => {
  return (
    <label
      key={id}
      htmlFor={id}
      // className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      className={cx(
        'relative',
        'p-2',
        'text-base font-medium leading-none',
        'cursor-pointer',
        'text-black',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      )}
    >
      <div className="absolute -inset-0.5 rounded-lg bg-card"></div>
      <div className="relative flex items-center space-x-2">
        <Checkbox id={id} {...props} />
        <p className={cx('mt-0')}>{children}</p>
      </div>
    </label>
  );
};
