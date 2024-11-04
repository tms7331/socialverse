"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function LandingPage() {
    const [email, setEmail] = useState('')
    const [feedback, setFeedback] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { toast } = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log('Submitted:', { email, feedback })
        toast({
            title: "Submission Received!",
            description: "Thanks for your interest in SociaIRL!",
        })
        // setEmail('')
        // setFeedback('')
        setIsSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100/95 to-white/95 bg-[url('/bg4.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay">
            <main className="container mx-auto px-4 py-12">
                <section className="max-w-2xl mx-auto text-center mb-12 bg-white/40 backdrop-blur-sm rounded-lg p-8">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">Welcome to SociaIRL</h2>
                    <p className="text-lg text-black mb-8">
                        Welcome to SociaIRL, a next generation dating app where meeting people who share your interests has never been easier!
                    </p>
                    <p className="text-lg text-black mb-8">
                        No more swiping — SociaIRL lets you import your interests and preferences from your favorite apps, then organizes group outings with like-minded people through curated live events like dinners, scenic walks, live music nights, and even pickleball games.
                    </p>
                    <p className="text-lg text-black mb-8">
                        Whether you're looking to expand your social circle or discover new activities, SociaIRL turns common interests into real-life connections, seamlessly and authentically.
                    </p>
                </section>

                <section className="max-w-md mx-auto bg-white/40 backdrop-blur-sm rounded-lg p-8">
                    {isSubmitted ? (
                        <p className="text-lg text-black text-center">Thank you for your interest!</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                                    Get Early Access
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="feedback" className="block text-sm font-medium text-black mb-1">
                                    What experiences would you like to see on SociaIRL?
                                </label>
                                <Textarea
                                    id="feedback"
                                    placeholder="Share your thoughts..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="w-full h-32"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </form>
                    )}
                </section>


            </main>
        </div>
    )
}