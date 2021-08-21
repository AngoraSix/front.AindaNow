import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../api';
import { useLoading } from '../../hooks/app';
import { useCurrentUser } from '../../hooks/user';
import App from './App.component';

const AppContainer = (props) => {
  const reduxDispatch = useDispatch();
  const user = useCurrentUser();
  const router = useRouter();
  const { isLoading, doLoad } = useLoading();

  const startLoading = () => {
    doLoad(true);
  };
  const finishLoading = () => {
    doLoad(false);
  };

  useEffect(() => {
    if (user && user.jwt) {
      api.users.setAuthorizationToken(user.jwt);
    }

    router.events.on('beforeHistoryChange', startLoading);
    router.events.on('routeChangeStart', startLoading);

    router.events.on('routeChangeComplete', finishLoading);
    router.events.on('routeChangeError', finishLoading);

    return () => {
      router.events.off('beforeHistoryChange', startLoading);
      router.events.off('routeChangeStart', startLoading);

      router.events.off('routeChangeComplete', finishLoading);
      router.events.off('routeChangeError', finishLoading);
    };
  }, []);

  return <App user={user} isLoading={isLoading} {...props} />;
};

export default AppContainer;
