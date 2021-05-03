class Api {
  constructor(env) {
    this.serverBaseURL =
      env.API_SERVER_BASE_URL || 'https://api.hoc.tincho.com.ar/';
    this.browserBaseURL =
      env.API_BROWSER_BASE_URL || 'https://api.hoc.tincho.com.ar/';
  }
}

export default Api;
