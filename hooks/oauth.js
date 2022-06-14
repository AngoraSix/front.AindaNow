import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useLoading } from './app';

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
  return { session, status };
};

// If there is a session with an expired token, reauthenticate, otherwise if there is no session, leave it as it is
export const checkActiveToken = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const { doLoad } = useLoading();

  useEffect(() => {
    const shouldReauth = session?.error === 'RefreshAccessTokenError';
    doLoad(shouldReauth);
    const identityProvider = session?.user?.identityProvider;
    if (shouldReauth) {
      signIn(
        'angorasixkeycloak',
        null,
        identityProvider ? { kc_idp_hint: identityProvider } : null
      );
    }
  }, [session, loading]);
  return { session, status };
};
