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
            session.googleId = token.googleId;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
