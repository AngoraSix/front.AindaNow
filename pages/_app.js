import { SessionProvider as NextAuthProvider } from "next-auth/react";
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import api from '../api';
import App from '../components/App';
import config from '../config';
import { CURRENCIES } from '../constants';
import { loadBrandsAction } from '../store/brands';
import { loadCurrenciesAction } from '../store/currencies';
import reducers from '../store/reducers';
import { loadVehicleTypesAction } from '../store/vehicleTypes';
import '../styles/App.css';
import '../styles/Carousel.css';
import '../styles/CommonTable.css';
import '../styles/DefaultLayout.css';
import '../styles/globals.css';
import '../styles/Home.css';
import '../styles/LandingLayout.css';
import '../styles/Menu.css';
import '../styles/Navbar.css';
import '../styles/Profile.css';
import '../styles/ProjectCard.css';
import '../styles/ProjectsList.css';
import '../styles/Vehicles.css';
import '../styles/ViewVehicle.css';
import { getEnv } from '../utils/env';


const HOCWebApp = ({ Component, pageProps, preloadedState, env }) => {
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

HOCWebApp.defaultProps = {
  pageProps: {},
  preloadedState: {},
  env: {},
};

HOCWebApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
  preloadedState: PropTypes.object,
  env: PropTypes.object,
};

HOCWebApp.getInitialProps = async (ctx) => {
  const env = getEnv();

  config.applyEnvConfig(env);
  api.applyEnvConfig(env);

  const store = createStore(reducers);

  // Load brands
  // const { data: brands } = await api.vehicles.listBrands({
  //   limit: 99999999,
  // });
  // store.dispatch(loadBrandsAction(brands));
  store.dispatch(loadBrandsAction([]));

  // Load vehicle types
  // const { data: vehicleTypes } = await api.vehicles.listVehicleTypes({
  //   limit: 99999999,
  // });
  // store.dispatch(loadVehicleTypesAction(vehicleTypes));
  store.dispatch(loadVehicleTypesAction([]));
  
  // Load currencies
  store.dispatch(loadCurrenciesAction(CURRENCIES));

  const preloadedState = store.getState();

  return {
    preloadedState,
    env,
  };
}

export default HOCWebApp;
