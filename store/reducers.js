import { combineReducers } from 'redux';
import app from './app';
import ssr from './ssr';
import user from './user';
import companies from './companies';
import brands from './brands';
import currencies from './currencies';
import vehicleTypes from './vehicleTypes';
import device from './device';

const reducers = combineReducers({
  app,
  ssr,
  user,
  device,
  companies,
  brands,
  currencies,
  vehicleTypes,
});

export default reducers;
