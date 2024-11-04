import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
    // Mock data for events
    const events = [
        { id: 1, title: "Summer Beach Party", description: "Join us for a fun day at the beach with music, games, and BBQ!", date: new Date("2023-07-15") },
        { id: 2, title: "Tech Meetup", description: "Network with fellow developers and learn about the latest technologies.", date: new Date("2023-07-22") },
        { id: 3, title: "Charity Run", description: "5K run to raise funds for local animal shelters. All fitness levels welcome!", date: new Date("2023-08-05") },
        { id: 4, title: "Art Exhibition Opening", description: "Featuring works from emerging local artists. Wine and cheese will be served.", date: new Date("2023-08-12") },
    ]

    // Function to format date
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Events</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Link href={`/events/${event.id}`} key={event.id} className="block hover:shadow-lg transition-shadow duration-200">
                        <Card>
                            <CardHeader>
                                <CardTitle>{event.title}</CardTitle>
                                <CardDescription>{formatDate(event.date)}</CardDescription>
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