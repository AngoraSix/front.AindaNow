import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import api from '../api';
import A6App from '../components/App';
import config from '../config';
import reducers from '../store/reducers';
import '../styles/App.css';
import '../styles/Commons.css';
import '../styles/Editable.css';
import '../styles/InputDialogs.css';
import '../styles/Layouts.css';
import '../styles/Media.css';
import '../styles/Messages.css';
import '../styles/Navbar.css';
import '../styles/Notifications.css';
import '../styles/Profile.css';
import '../styles/ProjectCard.css';
import '../styles/ProjectForm.css';
import '../styles/ProjectPresentationView.css';
import '../styles/ProjectPresentationsList.css';
import '../styles/globals.css';
import { getPublicEnv, removeSecrets } from '../utils/env';
global.EventSource = require('eventsource');

const AindaNowWebApp = ({ Component, pageProps, preloadedState, env }) => {
  const store = createStore(reducers, preloadedState);

  config.applyEnvConfig(env);
  api.applyEnvConfig(env);

  return (
    <>
      <ReduxProvider store={store}>
        <NextAuthProvider session={pageProps.session} refetchInterval={1 * 30}>
          <A6App>
            <Component {...pageProps} />
          </A6App>
        </NextAuthProvider>
      </ReduxProvider>
      {/* Google tag */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${config.thirdParties.googleAnalytics.id}`}></Script>
      <Script id="ga-script">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());

        gtag('config', '${config.thirdParties.googleAnalytics.id}');`}
      </Script>
      {/* Google reCaptcha */}
      <Script async defer src={`https://www.google.com/recaptcha/api.js?render=${config.thirdParties.googleRecaptcha.key}`}></Script>
    </>
  );
};

AindaNowWebApp.defaultProps = {
  pageProps: {},
  preloadedState: {},
  env: {},
};

AindaNowWebApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
  preloadedState: PropTypes.object,
  env: PropTypes.object,
};

AindaNowWebApp.getInitialProps = async () => {
  const env = getPublicEnv();

  config.applyEnvConfig(env);
  api.applyEnvConfig(env);

  const store = createStore(reducers);

  const preloadedState = store.getState();

  return {
    preloadedState,
    env: removeSecrets(env), // Just for a double-check before passing to front, there should be no AN_PUBLIC_APP_ keys at this point
  };
};

export default appWithTranslation(AindaNowWebApp);
