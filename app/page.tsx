'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/constants/categories';
import { TPages } from '@/types/pages';
import { PAGES } from '@/constants/pages';

const LOGO_SIZE = 28;

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
    <div className="min-h-screen bg-background text-foreground">
      <main className="flex flex-col items-stretch container mx-auto px-4 py-8 gap-8">
        <Link
          className="flex flex-row items-center gap-2"
          href="/"
          style={{ height: LOGO_SIZE }}
        >
          <Image
            src="logo-light.svg"
            alt="logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
          />
          <h1 className="text-3xl font-bold font-title">
            Welcome to SocialVerse
          </h1>
        </Link>

        <div>
          <h2 className="text-xl font-semibold mb-4">Filter by Category:</h2>
          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPages.map((page) => (
            <Link key={page.id} href={page.href}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {page.icon}
                  <h3 className="mt-4 text-lg font-semibold text-center">
                    {page.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
