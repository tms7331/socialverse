"use client"
import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
    const [availability, setAvailability] = useState('')
    const [selectedActivities, setSelectedActivities] = useState<string[]>([])

    const activities = [
        { id: 'dinners', label: 'Dinners' },
        { id: 'walks', label: 'Walks' },
        {
            id: 'sports', label: 'Sports', isCategory: true, children: [
                { id: 'pickleball', label: 'Pickleball' },
                { id: 'ax-throwing', label: 'Ax Throwing' },
                { id: 'hiking', label: 'Hiking' },
            ]
        },
        {
            id: 'activities', label: 'Activities', isCategory: true, children: [
                { id: 'museums', label: 'Museums' },
                { id: 'arcades', label: 'Arcades' },
                { id: 'escape-room', label: 'Escape Room' },
            ]
        },
    ]

    const handleActivityChange = (activityId: string, checked: boolean) => {
        setSelectedActivities(prev =>
            checked ? [...prev, activityId] : prev.filter(id => id !== activityId)
        )
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log('Availability:', availability)
        console.log('Selected Activities:', selectedActivities)
        // Handle form submission here
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Curated</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="availability" className="block text-sm font-medium mb-2">
                        Describe your availability
                    </label>
                    <Textarea
                        id="availability"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        placeholder="I'm free on weekends and after 6pm on weekdays..."
                        className="w-full"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Select activities that sound fun:</h2>
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div key={activity.id} className="space-y-2">
                                {activity.isCategory ? (
                                    <h3 className="text-md font-medium">{activity.label}</h3>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={activity.id}
                                            checked={selectedActivities.includes(activity.id)}
                                            onCheckedChange={(checked) => handleActivityChange(activity.id, checked as boolean)}
                                        />
                                        <label
                                            htmlFor={activity.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {activity.label}
                                        </label>
                                    </div>
                                )}
                                {activity.children && (
                                    <div className="ml-6 space-y-2">
                                        {activity.children.map((child) => (
                                            <div key={child.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={child.id}
                                                    checked={selectedActivities.includes(child.id)}
                                                    onCheckedChange={(checked) => handleActivityChange(child.id, checked as boolean)}
                                                />
                                                <label
                                                    htmlFor={child.id}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {child.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}