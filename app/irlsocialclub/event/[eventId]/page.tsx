"use client"

import { Button } from "@/components/ui/button"
import { CalendarIcon, Check, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { useSession } from "next-auth/react";


const writeJoinEvent = async (eventId: string, did: string) => {
    const tableName = "irlsc_attendees";
    const response = await fetch("/api/addItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "tableName": tableName, "content": { "eventId": eventId, "did": did } }),
    });
    const result = await response.json();
    console.log("Add item result:", result);
};


const getAttendees = async (eventId: string) => {
    const response = await fetch("/api/queryItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tableName: "irlsc_attendees",
            partitionKey: "eventId",  // Example partition key for GSI
            partitionValue: eventId,  // Value to query by
            //indexName: "EventIdIndex",     // Secondary index name
            // Optional sort key and value
            //sortKey: "createdAt",
            //sortValue: 1633036800,
        }),
    });
    const result = await response.json();
    console.log("Queried items from secondary index:", result);
    return result;
};


const bulkQuery = async () => {
    // socialverse_data : "did", "dataTag"
    const tableName = "socialverse_data";
    // did and dataTag for EACH of the keys
    const keys = dataSources.map(source => ({ did: "abcd-efgh", dataTag: source }))
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
    if (result.items) {
        setDataStatus(result.items.map(item => ({ [item.dataTag]: item.uploaded })))
    }
    console.log("Bulk queried items:", result);
};


export default function EventPage() {
    const params = useParams();
    const eventId = params.eventId;
    const { data: session } = useSession();
    const [isAttending, setIsAttending] = useState(false);
    const [attendees, setAttendees] = useState([]);

    const joinEvent = () => {
        // TODO: actually join the event
        // console.log("Join event");
        //const did = session?.user
        //console.log("DID?", did)
        //console.log("Session?", session)
        //const didf = "abcd";
        const did = session?.googleId;
        writeJoinEvent(eventId as string, did as string);
    }

    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '123 Main St, Anytown, USA', // Placeholder until we add location to events
        attendees: 50 // Placeholder until we add attendee tracking
    });

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const tableName = "irlsc_events";
                const response = await fetch("/api/getItem", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "tableName": tableName,
                        "key": { "eventId": eventId }
                    }),
                });
                const result = await response.json();
                console.log("Fetch event result:", result);
                if (result.item) {
                    setEvent(prevState => ({
                        ...prevState,
                        ...result.item
                    }));
                }

                // Get attendees
                const attendeesResp = await getAttendees(eventId as string);
                if (attendeesResp.items) {
                    // Iterate through list of attendees, and pull their info from the socialverse_users table
                    // bulk query instead....

                    // TODO - bulk query
                    // const attendees = attendeesResp.items.map(async (attendee: any) => {
                    //     const userResp = await getUser(attendee.did);
                    //     return userResp.item;
                    // });
                    // setAttendees(attendees);
                }
                console.log("Attendees:", attendeesResp.items);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        if (eventId) {
            fetchEventData();
        }
    }, [eventId]);

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">{event.title}</h1>

            <div className="space-y-4 mb-8">
                <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                    <UsersIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>{event.attendees} attendees</span>
                </div>
            </div>

            <div className="bg-muted p-4 rounded-lg mb-8">
                <h2 className="text-lg font-semibold mb-2">Event Description</h2>
                <p>{event.description}</p>
            </div>
            {!isAttending ? (
                <Button onClick={joinEvent} className="w-full md:w-auto">Join Event</Button>
            ) : (
                <Button disabled className="w-full md:w-auto bg-green-600 hover:bg-green-600 cursor-default">
                    <Check className="mr-2 h-4 w-4" />
                    You're attending!
                </Button>
            )}

            <div>{attendees}</div>
        </div>
    )
}