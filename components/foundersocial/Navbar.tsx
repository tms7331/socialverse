"use client"

import * as React from "react"
import Link from "next/link"
import { Rocket, Menu } from 'lucide-react'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function useDeviceType() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
}

export default function Component() {
    const { data: session } = useSession()
    const isMobile = useDeviceType();

    const navItems = [
        { href: "/foundersocial/account", label: "Account" },
        { href: "/foundersocial/explore", label: "Explore" },
        { href: "/foundersocial/create", label: "Create" },
        { href: "/foundersocial/myevents", label: "My Events" },
    ]

    const UserInfo = () => (
        <div className="flex items-center mr-4">
            {session ? (
                <>
                    <span className="text-sm text-muted-foreground mr-2">
                        Welcome, {session.user?.name}
                    </span>
                </>
            ) : (
                <span className="text-sm text-muted-foreground">
                    Please log in to see your profile
                </span>
            )}
        </div>
    )

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Rocket className="h-8 w-8 text-primary mr-2" />
                    <Link href="/foundersocial" className="flex items-center space-x-2">
                        <span className="text-xl font-bold">Foundersocial</span>
                    </Link>
                </div>
                {session ? (
                    !isMobile ? (
                        <div className="flex items-center">
                            <UserInfo />
                            <nav className="flex items-center space-x-4">
                                {navItems.map((item) => (
                                    <Link key={item.href} href={item.href}>
                                        <Button variant="ghost">{item.label}</Button>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="px-2 py-1.5">
                                    <UserInfo />
                                </div>
                                {navItems.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                        <Link href={item.href}>
                                            <Button variant="ghost" className="w-full justify-start">
                                                {item.label}
                                            </Button>
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                ) : null}
            </div>
        </header>
    )
}