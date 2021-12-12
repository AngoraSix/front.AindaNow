import config from '../config';
import BaseAPI from './BaseAPI';
import ProjectsAPI from './projects';
import ContributorsAPI from './contributors';
import VehiclesAPI from './vehicles';

class API {
  constructor() {
    this.applyEnvConfig();
  }

  get projects() {
    return this.projectsAPI;
  }

  get vehicles() {
    return this.vehiclesAPI;
  }

  get contributors() {
    return this.contributorsAPI;
  }

  applyEnvConfig() {
    this.axios = new BaseAPI({
      serverBaseURL: config.api.serverBaseURL,
      browserBaseURL: config.api.browserBaseURL,
    });

    this.projectsAPI = new ProjectsAPI(_getServiceAPI('projects', this.axios));
    this.vehiclesAPI = new VehiclesAPI(this.axios);
    this.contributorsAPI = new ContributorsAPI(this.axios);
  }
}

const _getServiceAPI = (service, axiosInstance) => {
  const serviceOverrideBaseURL = config.api.servicesOverrideBaseURLs[service];
  return serviceOverrideBaseURL
    ? new BaseAPI({
        baseURL: serviceOverrideBaseURL,
      })
    : axiosInstance;
};

const api = new API();

export default api;
