"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Menu } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            Connect in Real Life
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            IRL Social Club brings people together by making it easy to find and join real-life experiences with others who share your interests. By importing data from your favorite apps, IRL Social Club matches you with curated events—like intimate dinners, scenic walks, or lively music nights—designed to connect you with like-minded people. Or, explore community-hosted events in your area, from pickleball games to cozy watch parties. Whether you're looking to meet new friends or simply find something fun to do, IRL Social Club makes discovering meaningful in-person experiences effortless.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold">
                                Join Now
                            </Button>
                            <Button variant="outline" className="text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full text-lg font-semibold border-2 border-blue-600">
                                Explore Events <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                            <span className="text-gray-500 text-lg">Event Image Placeholder</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}