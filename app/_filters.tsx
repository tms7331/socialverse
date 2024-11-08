'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { CATEGORIES } from '@/constants/categories';
import { cx } from 'class-variance-authority';
import { FC } from 'react';

type TProps = {
  selectedCategories: string[];
  onCategoryChange(next: string): void;
};
export const Filters: FC<TProps> = (props) => {
  return (
    <div className={cx('relative p-4')}>
      <div className="absolute -inset-2 bg-black opacity-20 rounded-t-2.5xl"></div>
      <h2 className="text-xl font-semibold mb-4">Filter by Category:</h2>
      <div className="relative flex flex-wrap gap-4">
        {CATEGORIES.map((category) => (
          <label
            key={category.id}
            htmlFor={category.id}
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
              <Checkbox
                id={category.id}
                {...props}
                checked={props.selectedCategories.includes(category.id)}
                onCheckedChange={() => props.onCategoryChange(category.id)}
              />
              <p className={cx("mt-0")}>{category.label}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
