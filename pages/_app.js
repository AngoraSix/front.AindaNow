import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import api from '../api';
import App from '../components/App';
import config from '../config';
import reducers from '../store/reducers';
import '../styles/App.css';
import '../styles/Editable.css';
import '../styles/FileDragAndDrop.css';
import '../styles/InputDialogs.css';
import '../styles/Layouts.css';
import '../styles/globals.css';
import '../styles/Messages.css';
import '../styles/Navbar.css';
import '../styles/Profile.css';
import '../styles/ProjectCard.css';
import '../styles/ProjectsList.css';
import '../styles/ProjectForm.css';
import { getEnv } from '../utils/env';

const A6WebApp = ({ Component, pageProps, preloadedState, env }) => {
  const store = createStore(reducers, preloadedState);

  config.applyEnvConfig(env);
  api.applyEnvConfig(env);
  return (
    <ReduxProvider store={store}>
      <NextAuthProvider session={pageProps.session} refetchInterval={1 * 30}>
        <App>
          <Component {...pageProps} />
        </App>
      </NextAuthProvider>
    </ReduxProvider>
  );
};

A6WebApp.defaultProps = {
  pageProps: {},
  preloadedState: {},
  env: {},
};

A6WebApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
  preloadedState: PropTypes.object,
  env: PropTypes.object,
};

A6WebApp.getInitialProps = async (ctx) => {
  const env = getEnv();

  config.applyEnvConfig(env);
  api.applyEnvConfig(env);

  const store = createStore(reducers);

  const preloadedState = store.getState();

  return {
    preloadedState,
    env,
  };
};

export default A6WebApp;
