'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Check, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import LoginButton from "@/components/LoginButton"
import Link from 'next/link'

const writeAccount = async (did: string, userName: string, bio: string) => {
    const tableName = "socialverse_users";
    const response = await fetch("/api/addItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "tableName": tableName, "content": { "did": did, "userName": userName, "bio": bio } }),
    });
    const result = await response.json();
    console.log("Add item result:", result);
};

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

const updateDatabaseEntry = async (did: string, updates: any) => {
    const response = await fetch("/api/updateItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "tableName": "socialverse_users",
            key: { did: did },
            updates: updates,
        }),
    });

    return await response.json();
};


export default function Component() {
    const { data: session } = useSession();
    const dataSources = ["identity", "spotify", "linkedin", "github", "yc"]

    const [dataStatus, setDataStatus] = useState(Object.fromEntries(dataSources.map(source => [source, false])))
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")

    const fetchExistingProofs = async () => {
        const tableName = "socialverse_data";
        const did = session?.googleId;
        const keys = dataSources.map(source => ({ did: did, dataTag: source }))
        const response = await fetch("/api/batchGetItems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tableName: tableName,
                keys: keys,
            }),
        });

        const result = await response.json();
        if (result.items) {
            console.log("Bulk queried proof items:", result.items);
            const dataTags = new Set(result.items.map((item: any) => item.dataTag));
            console.log("Data tags:", dataTags);
            setDataStatus(Object.fromEntries(dataSources.map(source => [source, dataTags.has(source)])));
        }
        console.log("Bulk queried items:", result);
    };

    useEffect(() => {
        fetchExistingProofs();
    }, []);

    useEffect(() => {
        const initializeAccount = async () => {
            if (session?.googleId) {
                console.log("Session changed:", session);
                const existingAccount = await fetchAccount(session.googleId as string);
                if (!existingAccount) {
                    writeAccount(session.googleId as string, session.user?.name as string, "");
                } else {
                    setUserName(existingAccount.userName || "")
                    setBio(existingAccount.bio || "")
                }
            }
        };

        initializeAccount();
    }, [session]);

    const DataSourceButton = ({ name, uploaded }: { name: string, uploaded: boolean }) => (
        <Button
            variant="outline"
            className="w-full justify-between"
            disabled
        >
            {name}
            {uploaded ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
        </Button>
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (session?.googleId) {
            try {
                const did = session?.googleId;
                const updates = {
                    userName: userName,
                    bio,
                };
                await updateDatabaseEntry(did as string, updates);
                toast({
                    title: "Account updated",
                    description: "Your profile information has been successfully updated.",
                });
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to update profile. Please try again.",
                    variant: "destructive",
                });
            }
        }
    }

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
                        <LoginButton />
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">About Me</span>
                            </div>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us about yourself"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">Update</Button>
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
                            <Link href={`/irlsocialclub/data/${source}`} key={source}><DataSourceButton key={source} name={source.charAt(0).toUpperCase() + source.slice(1)} uploaded={status} /></Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}