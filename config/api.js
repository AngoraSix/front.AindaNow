class Api {
  constructor(env) {
    this.serverBaseURL = env.API_SERVER_BASE_URL || 'https://gerserver.com.ar/';
    this.browserBaseURL =
      env.API_BROWSER_BASE_URL || 'https://gerbrowser.com.ar/';
    this.servicesOverrideBaseURLs = {
      projects: env.API_PROJECTS_SERVER_BASE_URL,
      media: env.AN_FRONT_API_MEDIA_SERVER_BASE_URL,
      contributors: env.API_CONTRIBUTORS_SERVER_BASE_URL,
      surveys: env.API_SURVEYS_SERVER_BASE_URL,
    };
    this.servicesAPIGatewayPath = {
      projects: env.API_PROJECTS_SERVER_APIGATEWAY_PATH || '/projects',
      media: env.API_MEDIA_SERVER_APIGATEWAY_PATH || '/media',
      contributors:
        env.API_CONTRIBUTORS_SERVER_APIGATEWAY_PATH || '/contributors',
      surveys:
          env.API_SURVEYS_SERVER_APIGATEWAY_PATH || '/surveys',
    };
    this.servicesAPIParams = {
      clubsWellKnownContributorCandidatesType:
        env.APIPARAMS_CLUBS_WELLKNOWN_CONTRIBUTORCANDIDATES ||
        'contributor-candidates',
    };
    this.mediaOverrideBaseURL = env.AN_FRONT_PUBLIC_MEDIA_SERVER_BASE_URL;
    this.frontLocalhost = env.API_EVENTSOURCE_LOCALHOST || 'https://localhost/';
  }
}

export default Api;
