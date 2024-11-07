"use client"

import { ArrowRight, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
                            Founder Social Club brings people together by making it easy to find and join real-life experiences with others who share your interests. By importing data from your favorite apps, Founder Social Club matches you with curated events—like intimate dinners, scenic walks, or lively music nights—designed to connect you with like-minded people. Or, explore community-hosted events in your area, from pickleball games to cozy watch parties. Whether you're looking to meet new friends or simply find something fun to do, Founder Social Club makes discovering meaningful in-person experiences effortless.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/foundersocialclub/account" className="inline-flex items-center justify-center rounded-full text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6">
                                Join Now
                            </Link>
                            <Link href="/foundersocialclub/explore" className="inline-flex items-center justify-center rounded-full text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6">
                                Explore Events <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="relative bg-gray-200 rounded-lg aspect-video">
                            <Image
                                src="/foundersclanding.png"
                                alt="People enjoying social activities"
                                fill
                                className="rounded-lg object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}