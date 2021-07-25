class Api {
  constructor(env) {
    this.serverBaseURL =
      env.API_SERVER_BASE_URL || 'https://api.hoc.tincho.com.ar/';
    this.browserBaseURL =
      env.API_BROWSER_BASE_URL || 'https://api.hoc.tincho.com.ar/';
    this.servicesOverrideBaseURLs = {
      oauth: env.API_OAUTH_SERVER_BASE_URL,
      projects: env.API_PROJECTS_SERVER_BASE_URL,
    };
  }
}

export default Api;
