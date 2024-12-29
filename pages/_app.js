import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
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
import '../styles/Landing.css';
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
import { getEnv } from '../utils/env';
global.EventSource = require('eventsource');

const AindaNowWebApp = ({ Component, pageProps, preloadedState, env }) => {
  const store = createStore(reducers, preloadedState);

  config.applyEnvConfig(env);
  api.applyEnvConfig(env);

  return (
    <ReduxProvider store={store}>
      <NextAuthProvider session={pageProps.session} refetchInterval={1 * 30}>
        <A6App>
          <Component {...pageProps} />
        </A6App>
      </NextAuthProvider>
    </ReduxProvider>
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

AindaNowWebApp.getInitialProps = async ({ ctx }) => {
  // const nextProps = App.getInitialProps(ctx);
  const env = getEnv();

  config.applyEnvConfig(env);
  api.applyEnvConfig(env);

  const store = createStore(reducers);

  const preloadedState = store.getState();

  return {
    // ...nextProps,
    preloadedState,
    env,
  };
};

export default appWithTranslation(AindaNowWebApp);
