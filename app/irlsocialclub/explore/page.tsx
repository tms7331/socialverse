import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Sample event data
const events = [
    {
        id: 1,
        title: "Community Meetup",
        description: "Join us for our monthly community gathering to discuss local issues and initiatives.",
        date: "2023-06-15",
        time: "18:00",
    },
    {
        id: 2,
        title: "Tech Workshop",
        description: "Learn the basics of web development in this hands-on workshop for beginners.",
        date: "2023-06-20",
        time: "14:00",
    },
    {
        id: 3,
        title: "Charity Run",
        description: "Participate in our annual 5K run to raise funds for local charities.",
        date: "2023-06-25",
        time: "09:00",
    },
]

export default function ExplorePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Explore</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Card key={event.id}>
                        <CardHeader>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>{`${event.date} at ${event.time}`}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{event.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Join</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}