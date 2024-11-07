'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import LoginButton from "@/components/LoginButton"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from 'next-auth/react'
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';


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


export default function JoinPage() {
    const { data: session } = useSession();
    const [isYCVerified, setIsYCVerified] = useState(false)

    // State to store the verification request URL
    const [requestUrl, setRequestUrl] = useState('');
    const [proofs, setProofs] = useState([]);

    const getVerificationReq = async () => {
        const APP_ID = process.env.NEXT_PUBLIC_RECLAIM_APP_ID;
        const APP_SECRET = process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET;
        const PROVIDER_ID = process.env.NEXT_PUBLIC_RECLAIM_PROVIDER_ID;

        // Initialize the Reclaim SDK with your credentials
        const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID as string, APP_SECRET as string, PROVIDER_ID as string);

        // Generate the verification request URL
        const requestUrl = await reclaimProofRequest.getRequestUrl();

        console.log('Request URL:', requestUrl);

        setRequestUrl(requestUrl);

        // Start listening for proof submissions
        await reclaimProofRequest.startSession({

            // Called when the user successfully completes the verification
            onSuccess: (proofs) => {
                console.log('Verification success', proofs);
                // Can't verify!
                // setProofs(proofs as never[]);
            },
            // Called if there's an error during verification
            onError: (error) => {
                console.error('Verification failed', error);
            },
        });
    };

    useEffect(() => {
        const initializeAccount = async () => {
            if (session?.googleId) {
                console.log("Session changed:", session);
                const existingAccount = await fetchAccount(session.googleId as string);
                if (!existingAccount) {
                    writeAccount(session.googleId as string, session.user?.name as string, "");
                }
            }
        };

        initializeAccount();
    }, [session]);

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
                            <LoginButton />
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        After signing in
                                    </span>
                                </div>
                            </div>

                            <div className="w-full max-w-md mx-auto space-y-6">
                                <Button onClick={getVerificationReq} className="w-full">
                                    Prove YC Founder Status
                                </Button>

                                {requestUrl && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Scan QR Code</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex justify-center">
                                            <QRCode value={requestUrl} size={200} />
                                        </CardContent>
                                        <Button onClick={handleYCVerification}>
                                            (Click to Fake Proof)
                                        </Button>
                                    </Card>
                                )}
                            </div>

                            <Dialog>
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
                            <Link href="/foundersocial/account" passHref>
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

