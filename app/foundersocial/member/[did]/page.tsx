"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from 'next/dist/client/components/navigation'


type UserProfile = {
    did: string
    userName: string
    startup: string
    problems: string
    interests: string
}


const fetchAccount = async (did: string) => {
    const tableName = "socialverse_users";
    const response = await fetch("/api/getItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "tableName": tableName, "key": { "did": did } }),
    });
    const result = await response.json();
    console.log("Get item result:", result);
    return result.item;
};




export default function Component() {
    const params = useParams();
    const did = params.did;

    const [user, setUser] = useState<UserProfile | null>(null);
    const [message, setMessage] = useState("")

    const handleSendMessage = () => {
        // Here you would typically send the message to your backend
        console.log("Sending message:", message)
        // Clear the message after sending
        setMessage("")
    }

    useEffect(() => {
        const initializeUser = async () => {
            const existingUser = await fetchAccount(did as string);
            if (existingUser) {
                setUser(existingUser);
            }
        };
        initializeUser();
    }, []);


    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>{user?.userName}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold">Areas of Interest</h2>
                            {user?.interests}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Current Startup</h2>
                            <p>{user?.startup}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Problems Solved and Faced</h2>
                            <p>{user?.problems}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mb-4"
                    />
                    <Button onClick={handleSendMessage}>Send Message</Button>
                </CardContent>
            </Card>
        </div>
    )
}