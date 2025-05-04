import { getFromEnvsOrElse } from "../utils/config";

class Api {
  constructor(env) {
    this.serverBaseURL = getFromEnvsOrElse(env, 'AN_APP_API_SERVICE_BASE_URL', 'https://gerserver.com.ar/');
    this.browserBaseURL =
      getFromEnvsOrElse(env, 'AN_PUBLIC_APP_API_BROWSER_BASE_URL', 'https://gerbrowser.com.ar/');
    this.servicesOverrideBaseURLs = {
      projects: getFromEnvsOrElse(env, 'AN_APP_API_PROJECTS_SERVICE_BASE_URL'),
      media: getFromEnvsOrElse(env, 'AN_PUBLIC_APP_API_MEDIA_SERVICE_BASE_URL'),
      contributors: getFromEnvsOrElse(env, 'AN_APP_API_CONTRIBUTORS_SERVICE_BASE_URL'),
      surveys: getFromEnvsOrElse(env, 'AN_APP_API_SURVEYS_SERVICE_BASE_URL'),
    };
    this.servicesAPIGatewayPath = {
      projects: getFromEnvsOrElse(env, 'AN_APP_API_PROJECTS_SERVICE_APIGATEWAY_PATH', '/projects'),
      media: getFromEnvsOrElse(env, 'AN_APP_API_MEDIA_SERVICE_APIGATEWAY_PATH', '/media'),
      contributors:
        getFromEnvsOrElse(env, 'AN_APP_API_CONTRIBUTORS_SERVICE_APIGATEWAY_PATH', '/contributors'),
      surveys:
        getFromEnvsOrElse(env, 'AN_APP_API_SURVEYS_SERVICE_APIGATEWAY_PATH', '/surveys'),
      notifications:
        getFromEnvsOrElse(env, 'AN_APP_API_NOTIFICATIONS_SERVICE_APIGATEWAY_PATH', '/notifications'),
      clubs:
        getFromEnvsOrElse(env, 'AN_APP_API_CLUBS_SERVICE_APIGATEWAY_PATH', '/clubs'),
    };
    this.servicesAPIParams = {
      clubsWellKnownContributorCandidatesType:
        getFromEnvsOrElse(env, 'AN_APP_API_PARAMS_CLUBS_WELLKNOWN_CONTRIBUTORCANDIDATES', 'CONTRIBUTOR_CANDIDATES'),
    };
    this.mediaOverrideBaseURL = getFromEnvsOrElse(env, 'AN_PUBLIC_APP_API_MEDIA_SERVICE_OVERRIDE_URL');
    this.frontLocalhost = getFromEnvsOrElse(env, 'AN_PUBLIC_APP_API_EVENTSOURCE_LOCALHOST', 'https://localhost/');
  }
}

export default Api;
