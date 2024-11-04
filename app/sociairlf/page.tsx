"use client"
import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CheckSquare, Square } from 'lucide-react'

export default function Component() {
    const [activities, setActivities] = useState({
        dinners: false,
        walks: false,
        sports: {
            axThrowing: false,
            pickleball: false,
        },
        activities: {
            museum: false,
            arcade: false,
            escapeRoom: false,
        },
    })

    const [qualities, setQualities] = useState({
        income: false,
        activityLevel: false,
        compatibility: false,
    })

    const [uploadedData, setUploadedData] = useState({
        strava: false,
        identity: false,
        spotify: false,
        twitter: false,
        instagram: false,
        linkedin: false,
    })

    const handleActivityChange = (category, activity = null) => {
        setActivities(prev => {
            if (activity) {
                return {
                    ...prev,
                    [category]: {
                        ...prev[category],
                        [activity]: !prev[category][activity],
                    },
                }
            }
            return { ...prev, [category]: !prev[category] }
        })
    }

    const handleQualityChange = (quality) => {
        setQualities(prev => ({ ...prev, [quality]: !prev[quality] }))
    }

    const handleDataUpload = (dataType) => {
        // Simulating data upload
        setUploadedData(prev => ({ ...prev, [dataType]: true }))
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-600 mb-2">SociaIRL</h1>
                    <p className="text-xl text-gray-600">Curated Meetups with Like-minded People</p>
                </header>

                <main className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Data</h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {Object.entries(uploadedData).map(([dataType, isUploaded]) => (
                                <div key={dataType} className="flex items-center space-x-2">
                                    <Button
                                        onClick={() => handleDataUpload(dataType)}
                                        className="flex-1 justify-between"
                                        variant="outline"
                                    >
                                        <span className="capitalize">{dataType}</span>
                                        {isUploaded ? (
                                            <CheckSquare className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Square className="w-5 h-5 text-gray-300" />
                                        )}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">What activities interest you?</h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="dinners"
                                    checked={activities.dinners}
                                    onCheckedChange={() => handleActivityChange('dinners')}
                                />
                                <label htmlFor="dinners" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Dinners
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="walks"
                                    checked={activities.walks}
                                    onCheckedChange={() => handleActivityChange('walks')}
                                />
                                <label htmlFor="walks" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Walks
                                </label>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-2">Sports</h3>
                                <div className="ml-4 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="axThrowing"
                                            checked={activities.sports.axThrowing}
                                            onCheckedChange={() => handleActivityChange('sports', 'axThrowing')}
                                        />
                                        <label htmlFor="axThrowing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Ax-throwing
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="pickleball"
                                            checked={activities.sports.pickleball}
                                            onCheckedChange={() => handleActivityChange('sports', 'pickleball')}
                                        />
                                        <label htmlFor="pickleball" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Pickleball
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-2">Activities</h3>
                                <div className="ml-4 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="museum"
                                            checked={activities.activities.museum}
                                            onCheckedChange={() => handleActivityChange('activities', 'museum')}
                                        />
                                        <label htmlFor="museum" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Museum
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="arcade"
                                            checked={activities.activities.arcade}
                                            onCheckedChange={() => handleActivityChange('activities', 'arcade')}
                                        />
                                        <label htmlFor="arcade" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Arcade
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="escapeRoom"
                                            checked={activities.activities.escapeRoom}
                                            onCheckedChange={() => handleActivityChange('activities', 'escapeRoom')}
                                        />
                                        <label htmlFor="escapeRoom" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Escape Room
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">What qualities do you care about?</h2>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="income"
                                    checked={qualities.income}
                                    onCheckedChange={() => handleQualityChange('income')}
                                />
                                <label htmlFor="income" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Income
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="activityLevel"
                                    checked={qualities.activityLevel}
                                    onCheckedChange={() => handleQualityChange('activityLevel')}
                                />
                                <label htmlFor="activityLevel" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Activity Level
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="compatibility"
                                    checked={qualities.compatibility}
                                    onCheckedChange={() => handleQualityChange('compatibility')}
                                />
                                <label htmlFor="compatibility" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Compatibility
                                </label>
                            </div>
                        </div>
                    </section>

                    <Button className="w-full">Get Started</Button>
                </main>
            </div>
        </div>
    )
}