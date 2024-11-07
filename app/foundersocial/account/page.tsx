'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function ManageAccount() {
    const [interests, setInterests] = useState('')
    const [startup, setStartup] = useState('')
    const [problems, setProblems] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send this data to your backend
        console.log({ interests, startup, problems })
        toast({
            title: "Account updated",
            description: "Your account information has been successfully updated.",
        })
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Manage Account</CardTitle>
                <CardDescription>Update your profile information to connect with like-minded entrepreneurs.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="interests">Areas of Interest</Label>
                        <Textarea
                            id="interests"
                            placeholder="E.g., AI, Blockchain, Sustainability, Social Media"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="startup">Description of Current Startup</Label>
                        <Textarea
                            id="startup"
                            placeholder="We connect to users' online social accounts and use AI to generate summaries and a personalized feed based on what users actually care about."
                            value={startup}
                            onChange={(e) => setStartup(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="problems">Problems Solved and Challenges Faced</Label>
                        <Textarea
                            id="problems"
                            placeholder="We make it easy to find the signal in the noise of online social apps, but we're having trouble getting initial traction."
                            value={problems}
                            onChange={(e) => setProblems(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Update Profile</Button>
                </CardFooter>
            </form>
        </Card>
    )
}