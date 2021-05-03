import config from '../config';
import BaseAPI from './BaseAPI';
import CompaniesAPI from './companies';
import OAuthAPI from './oauth';
import UsersAPI from './users';
import VehiclesAPI from './vehicles';

class API {
  constructor() {
    this.applyEnvConfig();
  }

  get companies() {
    return this.companiesAPI;
  }

  get vehicles() {
    return this.vehiclesAPI;
  }

  get users() {
    return this.usersAPI;
  }

  get oauth() {
    return this.oauthAPI;
  }

  applyEnvConfig() {
    this.axios = new BaseAPI({
      serverBaseURL: config.api.serverBaseURL,
      browserBaseURL: config.api.browserBaseURL,
    });

    this.companiesAPI = new CompaniesAPI(this.axios);
    this.vehiclesAPI = new VehiclesAPI(this.axios);
    this.usersAPI = new UsersAPI(this.axios);
    this.oauthAPI = new OAuthAPI(this.axios);
  }
}

const api = new API();

export default api;
