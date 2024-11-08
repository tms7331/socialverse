'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useEffect } from 'react';
import Link from 'next/link';

type Event = {
  eventId: string;
  title: string;
  description: string;
  date: string;
  time: string;
};

export default function ExplorePage() {
  // const getAllItemsFromDynamo = async () => {
  //     const tableName = "fs_events";
  //     const response = await fetch("/api/getAllItems", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ "tableName": tableName }),
  //     });
  //     const result = await response.json();
  //     console.log("Get all items result:", result);
  // };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const tableName = 'fs_events';
      const response = await fetch('/api/getAllItems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableName: tableName })
      });
      const result = await response.json();
      console.log('Fetch events result:', result);
      if (result.items) {
        setEvents(result.items);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event: Event) => (
          <Card key={event.eventId}>
            <div className="flex flex-col justify-between h-full">
              <div className='flex flex-col'>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{`${event.date} at ${event.time}`}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                </CardContent>
              </div>
              <CardFooter>
                <Link
                  href={`/foundersocial/event/${event.eventId}`}
                  className="w-full"
                >
                  <Button size="lg">View Details</Button>
                </Link>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
