import { signIn, useSession } from 'next-auth/react';
import { useLoading } from './app';
import { useEffect } from 'react';

export const useActiveSession = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const { doLoad } = useLoading();

  useEffect(() => {
    const shouldReauth = session?.error === 'RefreshAccessTokenError';
    doLoad(!session || loading || shouldReauth);
    const identityProvider = session?.user?.identityProvider;
    if (!session || shouldReauth) {
      signIn(
        'angorasixkeycloak',
        null,
        identityProvider ? { kc_idp_hint: identityProvider } : null
      ); // Force sign in to hopefully resolve error and be able to edit
    }
  }, [session, loading]);
};
