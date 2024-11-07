"use client"

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';


type Event = {
    eventId: string;
    title: string;
    description: string;
    date: string;
    time: string;
}


const getMyEvents = async (did: string) => {
    const response = await fetch("/api/queryItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tableName: "fs_attendees",
            partitionKey: "did",  // Example partition key for GSI
            partitionValue: did,  // Value to query by
            indexName: "did-index",     // Secondary index name
            // Optional sort key and value
            //sortKey: "createdAt",
            //sortValue: 1633036800,
        }),
    });
    const result = await response.json();
    console.log("Queried items from secondary index:", result);
    return result;
};


const bulkQuery = async (eventIds: string[]) => {
    console.log("Bulk querying events:", eventIds);
    const tableName = "fs_events";
    const keys = eventIds.map(eventId => ({ eventId: eventId }))
    const response = await fetch("/api/batchGetItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tableName: tableName,
            keys: keys,
        }),
    });

    const result = await response.json();
    console.log("Bulk queried items:", result);
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

    // Mock data for events
    // const events = [
    //     { id: 1, title: "Summer Beach Party", description: "Join us for a fun day at the beach with music, games, and BBQ!", date: new Date("2023-07-15") },
    //     { id: 2, title: "Tech Meetup", description: "Network with fellow developers and learn about the latest technologies.", date: new Date("2023-07-22") },
    //     { id: 3, title: "Charity Run", description: "5K run to raise funds for local animal shelters. All fitness levels welcome!", date: new Date("2023-08-05") },
    //     { id: 4, title: "Art Exhibition Opening", description: "Featuring works from emerging local artists. Wine and cheese will be served.", date: new Date("2023-08-12") },
    // ]

    // Function to format date
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Events</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Link href={`/irlsocialclub/event/${event.eventId}`} key={event.eventId} className="block hover:shadow-lg transition-shadow duration-200">
                        <Card>
                            <CardHeader>
                                <CardTitle>{event.title}</CardTitle>
                                <CardDescription>{formatDate(new Date(event.date))}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{event.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}