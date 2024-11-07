'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function JoinPage() {
    const [isYCVerified, setIsYCVerified] = useState(false)

    const handleGoogleSignUp = () => {
        // Here you would implement the Google Sign-Up logic
        console.log('Signing up with Google')
        // After successful Google sign-up, you might want to check YC status or redirect
    }

    const handleYCVerification = () => {
        // This is where you'd implement the actual YC verification logic
        setIsYCVerified(true)
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Join Foundersocial
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                {!isYCVerified ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Your Account</CardTitle>
                            <CardDescription>Sign up and verify your YC status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Button
                                onClick={handleGoogleSignUp}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Create account with Google
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        After creating your account
                                    </span>
                                </div>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        Prove YC
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Verify YCombinator Membership</DialogTitle>
                                        <DialogDescription>
                                            Please provide your YC credentials to verify your membership.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <Button onClick={handleYCVerification}>
                                            Verify with YC
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to Foundersocial!</CardTitle>
                            <CardDescription>Your YC membership has been verified.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/manage-account" passHref>
                                <Button className="w-full">
                                    Go to Manage Account
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}