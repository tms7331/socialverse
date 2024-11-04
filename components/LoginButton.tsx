import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div>
            {session ? (
                <>
                    <p>Welcome, {session.user?.name}</p>
                    <button onClick={() => signOut()}>Sign Out</button>
                </>
            ) : (
                <button onClick={() => signIn("google")}>Log in with Google</button>
            )}
        </div>
    );
};

export default LoginButton;
