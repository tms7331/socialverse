'use client';
import { useState } from 'react';
import { TPages } from '@/types/pages';
import { PAGES } from '@/constants/pages';
import { Header } from './_header';
import { Filters } from './_filters';
import { Grid } from './_grid';
import { cx } from 'class-variance-authority';

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
    <main
      className={cx(
        'flex flex-col items-stretch container mx-auto px-4',
        // 'gap-10 lg:gap-4',
        'py-12 lg:py-20'
      )}
    >
      <Header />
      <div
         className={cx(
          'flex flex-col items-stretch',
          'gap-5 lg:gap-5',
          'py-12 lg:py-14'
        )}
      >
        <Filters
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        <Grid filteredPages={filteredPages} />
      </div>
    </main>
  );
}
