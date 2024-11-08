'use client';
import { CheckboxText } from '@/components/ui/checkbox/text';
import { CATEGORIES } from '@/constants/categories';
import { cx } from 'class-variance-authority';
import { FC } from 'react';

type TProps = {
  selectedCategories: string[];
  onCategoryChange(next: string): void;
};
export const Filters: FC<TProps> = ({
  selectedCategories,
  onCategoryChange,
  ...props
}) => {
  return (
    <div className={cx('relative p-4')}>
      <div className="absolute -inset-2 bg-black opacity-20 rounded-t-2.5xl"></div>
      <h2 className="text-xl font-semibold mb-4">Filter by Category:</h2>
      <div className="relative flex flex-wrap gap-4">
        {CATEGORIES.map((category) => (
          <CheckboxText
            key={category.id}
            id={category.id}
            {...props}
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={() => onCategoryChange(category.id)}
          >
            {category.label}
          </CheckboxText>
        ))}
      </div>
    </div>
  );
};
