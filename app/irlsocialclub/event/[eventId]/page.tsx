"use client"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react"

export default function EventPage() {
    return (
        <div className="max-w-2xl mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Event</h1>

            <div className="space-y-4 mb-8">
                <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>Saturday, November 15, 2024</span>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>7:00 PM - 10:00 PM</span>
                </div>
                <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>123 Main St, Anytown, USA</span>
                </div>
                <div className="flex items-center">
                    <UsersIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>50 attendees</span>
                </div>
            </div>

            <div className="bg-muted p-4 rounded-lg mb-8">
                <h2 className="text-lg font-semibold mb-2">Event Description</h2>
                <p>Join us for an exciting evening of networking and fun! This is a placeholder description for the event. Replace this text with the actual details of your event.</p>
            </div>

            <Button className="w-full md:w-auto">Join Event</Button>
        </div>
    )
}