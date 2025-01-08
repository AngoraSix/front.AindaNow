import config from '../config';
import BaseAPI from './BaseAPI';
import ClubsAPI from './club';
import SurveysAPI from './surveys';
import ContributorsAPI from './contributors';
import FrontAPI from './front';
import ManagementAPI from './management';
import MediaAPI from './media';
import NotificationsAPI from './notifications';
import ProjectsAPI from './projects';
import ThirdPartiesAPI from './thirdparties';

class API {
  constructor() {
    this.applyEnvConfig();
  }

  get front() {
    return this.frontAPI;
  }

  get projects() {
    return this.projectsAPI;
  }

  get management() {
    return this.managementAPI;
  }

  get clubs() {
    return this.clubsAPI;
  }

  get surveys() {
    return this.SurveysAPI;
  }

  get media() {
    return this.mediaAPI;
  }

  get contributors() {
    return this.contributorsAPI;
  }

  get notifications() {
    return this.notificationsAPI;
  }

  get thirdParties() {
    return this.thirdPartiesAPI;
  }

  applyEnvConfig() {
    this.axios = new BaseAPI({
      serverBaseURL: config.api.serverBaseURL,
      browserBaseURL: config.api.browserBaseURL,
      infraConfigs: config.infra,
    });
    this.frontAPI = new FrontAPI(
      new BaseAPI({
        baseURL: '/',
      }),
      config.api.frontLocalhost
    );
    this.projectsAPI = new ProjectsAPI(_getServiceAPI('projects', this.axios));
    this.clubsAPI = new ClubsAPI(_getServiceAPI('clubs', this.axios));
    this.SurveysAPI = new SurveysAPI(_getServiceAPI('surveys', this.axios));
    this.managementAPI = new ManagementAPI(
      _getServiceAPI('management', this.axios)
    );
    this.mediaAPI = new MediaAPI(
      _getServiceAPI('media', this.axios),
      config.api.mediaOverrideBaseURL
    );
    this.contributorsAPI = new ContributorsAPI(
      _getServiceAPI('contributors', this.axios)
    );
    this.notificationsAPI = new NotificationsAPI(
      _getServiceAPI('notifications', this.axios)
    );
    this.thirdPartiesAPI = new ThirdPartiesAPI();
  }
}

const _getServiceAPI = (service, axiosInstance) => {
  const serviceOverrideBaseURL = config.api.servicesOverrideBaseURLs[service],
    apiGatewayPath = config.api.servicesAPIGatewayPath[service];

  return serviceOverrideBaseURL
    ? new BaseAPI({
        ...axiosInstance.getDefaults(),
        baseURL: serviceOverrideBaseURL,
      })
    : apiGatewayPath
    ? new BaseAPI({
        ...axiosInstance.getDefaults(),
        baseURL: `${axiosInstance.getBaseURL()}${apiGatewayPath}`,
      })
    : axiosInstance;
};

const api = new API();

export default api;
