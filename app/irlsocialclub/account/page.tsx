'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Check, X } from 'lucide-react'
import LoginButton from "@/components/LoginButton";


export default function Component() {
    const addItemToDynamo = async () => {
        const tableName = "socialverse_users";
        const response = await fetch("/api/addItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "tableName": tableName, "content": { "did": "abcd-efgh", "name": "Test Item" } }),
        });
        const result = await response.json();
        console.log("Add item result:", result);
    };

    const getItemFromDynamo = async () => {
        const tableName = "socialverse_users";
        const response = await fetch("/api/getItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "tableName": tableName, "key": { "did": "abcd-efgh" } }), // Adjust key structure to match your DynamoDB table
        });
        const result = await response.json();
        console.log("Get item result:", result);
    };

    const getAllItemsFromDynamo = async () => {
        const tableName = "socialverse_users";
        const response = await fetch("/api/getAllItems", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "tableName": tableName }),
        });
        const result = await response.json();
        console.log("Get all items result:", result);
    };



    // Simulated data upload status
    const [dataStatus, setDataStatus] = useState({
        strava: false,
        identity: true,
        spotify: true,
        twitter: false,
        instagram: true,
        linkedin: false
    })

    const DataSourceButton = ({ name, uploaded }) => (
        <Button
            variant="outline"
            className="w-full justify-between"
            disabled
        >
            {name}
            {uploaded ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
        </Button>
    )

    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-center">Your Account</h1>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Authentication</CardTitle>
                        <CardDescription>Sign in or create a new account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full" variant="outline">
                            Sign in with Google
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Create a password" />
                            </div>
                            <Button type="submit" className="w-full">Create Account</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Add Data</CardTitle>
                        <CardDescription>Connect your accounts to add data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(dataStatus).map(([source, status]) => (
                            <DataSourceButton key={source} name={source.charAt(0).toUpperCase() + source.slice(1)} uploaded={status} />
                        ))}
                    </CardContent>
                </Card>
                <Button onClick={addItemToDynamo}>Add Item</Button>
                <Button onClick={getItemFromDynamo}>Get Item</Button>
                <Button onClick={getAllItemsFromDynamo}>Get All Items</Button>
                <LoginButton />
            </div>
        </div>
    )
}