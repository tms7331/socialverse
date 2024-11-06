'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Facebook, Twitter, Instagram, Github } from 'lucide-react'

export default function ComingSoon() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle email submission here
        console.log('Email submitted:', email)
        setEmail('')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-4">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Coming Soon</h1>
                <p className="text-xl text-white mb-8">We're working hard to bring you something amazing. Stay tuned!</p>

                <form onSubmit={handleSubmit} className="mb-8 flex justify-center">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-64 mr-2 bg-white dark:bg-white text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500"
                        required
                    />
                    <Button type="submit">Notify Me</Button>
                </form>

            </div>
        </div>
    )
}