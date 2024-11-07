// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the Google user ID (sub) if it is available on first login
            if (profile?.sub) {
                token.googleId = profile.sub; // Store Google's unique user ID in the token
            }
            return token;
        },
        async session({ session, token }) {
            // Make the Google user ID available on the session
            session.googleId = token.googleId as string;
            return session;
        },
    },
};

// Create the NextAuth handler instance
const handler = NextAuth(authOptions);

// Export the handler as the appropriate HTTP methods
export { handler as GET, handler as POST };
