import { signIn, useSession } from 'next-auth/react';
import { useLoading } from './app';
import { useEffect } from 'react';

export const useActiveSession = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const { doLoad } = useLoading();

  useEffect(() => {
    const shouldReauth = session?.error === 'RefreshAccessTokenError';
    doLoad(loading || shouldReauth);
    if (shouldReauth) {
      signIn('angorasixkeycloak'); // Force sign in to hopefully resolve error and be able to edit
    }
  }, [session, loading]);
};
