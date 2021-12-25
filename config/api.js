class Api {
  constructor(env) {
    this.serverBaseURL = env.API_SERVER_BASE_URL || 'https://gerserver.com.ar/';
    this.browserBaseURL =
      env.API_BROWSER_BASE_URL || 'https://gerbrowser.com.ar/';
    this.servicesOverrideBaseURLs = {
      projects: env.API_PROJECTS_SERVER_BASE_URL,
      media: env.API_MEDIA_SERVER_BASE_URL,
      contributors: env.API_CONTRIBUTORS_SERVER_BASE_URL,
    };
    this.servicesAPIGatewayPath = {
      projects: env.API_PROJECTS_SERVER_APIGATEWAY_PATH || '/projects',
      media: env.API_MEDIA_SERVER_APIGATEWAY_PATH || '/media',
      contributors:
        env.API_CONTRIBUTORS_SERVER_APIGATEWAY_PATH || '/contributors',
    };
  }
}

export default Api;
