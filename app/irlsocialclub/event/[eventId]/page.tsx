"use client"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'next/navigation';

export default function EventPage() {
    const params = useParams();
    const eventId = params.eventId; // Access the dynamic route parameter

    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '123 Main St, Anytown, USA', // Placeholder until we add location to events
        attendees: 50 // Placeholder until we add attendee tracking
    });

    // Get eventId from URL path parameter
    //const pathname = window.location.pathname;
    // const eventId = pathname.split('/').pop();

    useEffect(() => {
        const fetchEvent = async () => {
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
        };

        if (eventId) {
            fetchEvent();
        }
    }, []);

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

            <Button className="w-full md:w-auto">Join Event</Button>
        </div>
    )
}