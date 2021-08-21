import Api from './api';
import App from './app';
import Companies from './companies';
import Publications from './publications';
import Server from './server';
import Site from './site';

class A6Config {
  constructor(env = {}) {
    this.applyEnvConfig(env);
  }

  get server() {
    return this.serverConfig;
  }

  get companies() {
    return this.companiesConfig;
  }

  get site() {
    return this.siteConfig;
  }

  get api() {
    return this.apiConfig;
  }

  get app() {
    return this.appConfig;
  }

  get publications() {
    return this.publicationsConfig;
  }

  applyEnvConfig(env = {}) {
    this.buildNo = env.BUILD || 'dev';
    this.serverConfig = new Server(env);
    this.companiesConfig = new Companies(env);
    this.siteConfig = new Site(env);
    this.apiConfig = new Api(env);
    this.publicationsConfig = new Publications(env);
    this.appConfig = new App(env);
  }
}

const config = new A6Config();

export default config;
