'use client';
import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { TPages } from '@/types/pages';
import { cx } from 'class-variance-authority';

type TProps = {
  filteredPages: TPages;
};
export const Grid: FC<TProps> = ({ filteredPages }) => {
  const isEmpty = filteredPages.length === 0;
  return (
    <div className="relative p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="absolute -inset-2 rounded-b-2.5xl bg-black opacity-20" />
      {isEmpty ? (
        <p>None found.</p>
      ) : (
        filteredPages.map((page) => (
          <Link
            key={page.id}
            href={page.href}
            className={cx('relative cursor-pointer')}
          >
            <Card
            // className={
            //   "hover:shadow-lg transition-shadow"
            // }
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                {page.icon}
                <h3 className="mt-4 text-lg font-semibold text-center">
                  {page.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};
