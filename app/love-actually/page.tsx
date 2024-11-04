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
        console.log('Submitted:', { email, feedback })
        toast({
            title: "Submission Received!",
            description: "Thanks for your interest in Love, Actually!",
        })
        setIsSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100/95 to-white/95 bg-[url('/bg4.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay">

            <main className="container mx-auto px-4 py-12">
                <section className="max-w-2xl mx-auto text-center mb-12 bg-white/40 backdrop-blur-sm rounded-lg p-8">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Love, Actually</h2>
                    <p className="text-lg text-black mb-8">
                        Discover "Love, Actually" – the dating app that makes intentional dating easy!
                    </p>
                    <p className="text-lg text-black mb-8">
                        By letting you import data from popular apps, it matches you with people who truly share your interests and values.
                    </p>
                    <p className="text-lg text-black mb-8">
                        With similarity scores across key interests and an improved version of OKCupid's compatability score, you’ll meet partners who feel like a perfect fit.
                    </p>
                    <p className="text-lg text-black mb-8">
                        Robust filtering options let you only match with those who meet your criteria.  Whether you're looking for a fun date or a serious relationship, "Love, Actually" makes it easy to be intentional in your journey to find the right match.
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
                                    What are you looking for our of a dating app?  What would convince you to use Love, Actually over other apps?
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