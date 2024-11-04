"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, User } from "lucide-react"
import { useSession } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavbarProps {
    session?: {
        user?: {
            name?: string
            image?: string
        }
        googleId?: string
    }
}

// export default function Navbar({ session }: NavbarProps = {}) {
const Navbar: React.FC = () => {
    const { data: session } = useSession();

    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold">IRL Social Club</span>
                    </Link>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    {session ? (
                        <>
                            <span className="text-sm text-muted-foreground">
                                Welcome, {session.user?.name}
                            </span>
                            <Avatar>
                                <AvatarImage src={session.user?.image} alt={session.user?.name} />
                                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                            </Avatar>
                        </>
                    ) : (
                        <span className="text-sm text-muted-foreground">
                            Please log in to see your profile
                        </span>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open menu">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href="/irlsocialclub/account" className="w-full">Account</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/irlsocialclub/explore" className="w-full">Explore</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/irlsocialclub/curated" className="w-full">Curated</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/irlsocialclub/myevents" className="w-full">My Events</Link>
                            </DropdownMenuItem>
                            {session && (
                                <DropdownMenuItem>
                                    <span className="w-full text-xs text-muted-foreground">
                                        Google ID: {session.googleId}
                                    </span>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;