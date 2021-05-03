import Api from './api';
import App from './app';
import Auth from './auth';
import Companies from './companies';
import Crypto from './crypto';
import OAuth from './oauth';
import Publications from './publications';
import Server from './server';
import Site from './site';

class HOCConfig {
  constructor(env = {}) {
    this.applyEnvConfig(env);
  }

  get server() {
    return this.serverConfig;
  }

  get auth() {
    return this.authConfig;
  }

  get oauth() {
    return this.oauthConfig;
  }

  get crypto() {
    return this.cryptoConfig;
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
    this.authConfig = new Auth(env);
    this.oauthConfig = new OAuth(env);
    this.cryptoConfig = new Crypto(env);
    this.companiesConfig = new Companies(env);
    this.siteConfig = new Site(env);
    this.apiConfig = new Api(env);
    this.publicationsConfig = new Publications(env);
    this.appConfig = new App(env);
  }
}

const config = new HOCConfig();

export default config;
