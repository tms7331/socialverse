// components/Navbar.tsx
"use client";

import { useSession } from "next-auth/react";

const Navbar: React.FC = () => {
    const { data: session } = useSession();

    return (
        <nav>
            <h1>Your App</h1>
            {session ? (
                <p>Welcome, {session.user?.name}</p>
            ) : (
                <p>Please log in to see your profile information</p>
            )}
        </nav>
    );
};

export default Navbar;
