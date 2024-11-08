'use client';
import { useState } from 'react';
import { TPages } from '@/types/pages';
import { PAGES } from '@/constants/pages';
import { Filters } from './_filters';
import { Grid } from './_grid';
import { cx } from 'class-variance-authority';
import { ComponentsColumn } from '@/components/column';
import { ShellHeader } from '@/shell/header';

export default function LandingPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredPages: TPages =
    selectedCategories.length === 0
      ? PAGES
      : PAGES.filter((page) =>
          page.categories.some((cat) => selectedCategories.includes(cat))
        );

  return (
    <>
      <ShellHeader />
      <main
        className={cx('flex flex-col items-stretch container mx-auto px-4')}
      >
        <ComponentsColumn classValue={cx('gap-5 lg:gap-5')}>
          <Filters
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
          <Grid filteredPages={filteredPages} />
        </ComponentsColumn>
      </main>
    </>
  );
}
