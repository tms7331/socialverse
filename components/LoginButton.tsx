import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const LoginButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <Button
            onClick={() => signOut()}
            className="w-full"
            variant="outline"
          >
            Sign out from Google
          </Button>
        </>
      ) : (
        <Button
          onClick={() => signIn('google')}
          className="w-full"
          variant="outline"
        >
          Sign in with Google
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
