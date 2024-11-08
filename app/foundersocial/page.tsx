'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import LoginButton from '@/components/LoginButton';
import Link from 'next/link';
import { cx } from 'class-variance-authority';

const fetchYCProof = async (did: string) => {
  const tableName = 'socialverse_data';
  const response = await fetch('/api/getItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tableName: tableName,
      key: { did: did, dataTag: 'yc_founder' }
    })
  });
  const result = await response.json();
  console.log('Get item result:', result);
  return result.item;
};

export default function LandingPage() {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkYCProof = async () => {
      if (session) {
        const did = session.googleId;
        const ycProof = await fetchYCProof(did as string);
        console.log('YC Proof:', ycProof);
        // Confirm that we have the founder proof... only have to check that one...
        if (ycProof && ycProof.items && ycProof.items.length > 0) {
          setIsLoggedIn(true);
        }
      }
    };

    checkYCProof();
  }, [session]);

  return (
    <div
      className={cx('min-h-screen', 'bg-gradient-to-b from-gray-100 to-white')}
    >
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Welcome to Foundersocial
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Welcome to Foundersocial, the exclusive community for Y Combinator
          founders and investors looking to connect in meaningful ways.
          Foundersocial isn't just another networking app – it's where genuine
          connections begin. Before each event, gain insight into who will be
          attending and discover what you share in common, making every
          gathering not only enjoyable but truly valuable. Dive into curated
          experiences designed to foster both camaraderie and collaboration.
          Sign up to join the club and start building relationships that go
          beyond the pitch.
        </p>

        <div className="flex flex-col items-center space-y-4">
          {isLoggedIn ? (
            <Link href="/foundersocial/explore">
              <Button size="lg">Explore Events</Button>
            </Link>
          ) : (
            <>
              <LoginButton />
              <Link href="/foundersocial/join">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Join the Community
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>

      <footer className="bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
          © 2024 Foundersocial. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
