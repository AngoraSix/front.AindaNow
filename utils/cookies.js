import Cookies from 'js-cookie';
import config from '../config';

export const setAuthCookie = (token) => {
  Cookies.set(config.auth.cookie, token);
};

export const getAuthCookie = () => {
  return Cookies.get(config.auth.cookie);
};

export const removeAuthCookie = () => {
  Cookies.remove(config.auth.cookie);
};
