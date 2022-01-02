import Api from './api';
import Site from './site';

class A6Config {
  constructor(env = {}) {
    this.applyEnvConfig(env);
  }

  get site() {
    return this.siteConfig;
  }

  get api() {
    return this.apiConfig;
  }

  applyEnvConfig(env = {}) {
    this.buildNo = env.BUILD || 'dev';
    this.siteConfig = new Site(env);
    this.apiConfig = new Api(env);
  }
}

const config = new A6Config();

export default config;
