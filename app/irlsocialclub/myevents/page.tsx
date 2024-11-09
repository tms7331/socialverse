'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type Event = {
  eventId: string;
  title: string;
  description: string;
  date: string;
  time: string;
};

const getMyEvents = async (did: string) => {
  const response = await fetch('/api/queryItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tableName: 'irlsc_attendees',
      partitionKey: 'did', // Example partition key for GSI
      partitionValue: did, // Value to query by
      indexName: 'did-index' // Secondary index name
      // Optional sort key and value
      //sortKey: "createdAt",
      //sortValue: 1633036800,
    })
  });
  const result = await response.json();
  console.log('Queried items from secondary index:', result);
  return result;
};

const bulkQuery = async (eventIds: string[]) => {
  console.log('Bulk querying events:', eventIds);
  const tableName = 'irlsc_events';
  const keys = eventIds.map((eventId) => ({ eventId: eventId }));
  const response = await fetch('/api/batchGetItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tableName: tableName,
      keys: keys
    })
  });

  const result = await response.json();
  console.log('Bulk queried items:', result);
  return result;
};

export default function Component() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (session) {
      const fetchEvents = async () => {
        const did = session.googleId as string;
        const eventIdsResp = await getMyEvents(did);
        const eventIds = eventIdsResp.items.map((event: any) => event.eventId);
        if (eventIds.length > 0) {
          const eventsResp = await bulkQuery(eventIds);
          const events = eventsResp.items;
          // Should always have some though...
          if (events) {
            setEvents(events);
          }
        }
      };
      fetchEvents();
    }
  }, [session]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link
            href={`/irlsocialclub/event/${event.eventId}`}
            key={event.eventId}
            className="block hover:shadow-lg transition-shadow duration-200"
          >
            <Card>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  {formatDate(new Date(event.date))}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
