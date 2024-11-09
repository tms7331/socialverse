import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <Button
            onClick={() => signOut()}
            // className="w-full"
            // variant="outline"
            size="lg"
            variant="default"
          >
            Sign out from Google
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => signIn('google')}
            // className="w-full"
            // variant="outline"
            variant="default"
            size="lg"
          >
            Sign in with Google
          </Button>
          <Link href="/foundersocial/join">
            <Button
              size="lg"
              // variant="outline"
              variant="outline"
              // className="w-full sm:w-auto"
            >
              Join the Community
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default LoginButton;
