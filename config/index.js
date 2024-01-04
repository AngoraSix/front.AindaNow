import Api from './api';
import Site from './site';
import ThirdParties from './thirdparties';
import Infra from './infra';
import ServicesDefaults from './servicesdefaults';

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

  get thirdParties() {
    return this.thirdPartiesConfig;
  }

  get infra() {
    return this.infraConfig;
  }

  get servicesDefaults() {
    return this.servicesDefaultsConfig;
  }

  applyEnvConfig(env = {}) {
    this.buildNo = env.BUILD || 'dev';
    this.siteConfig = new Site(env);
    this.apiConfig = new Api(env);
    this.thirdPartiesConfig = new ThirdParties(env);
    this.infraConfig = new Infra(env);
    this.servicesDefaultsConfig = new ServicesDefaults(env);
  }
}

const config = new A6Config();

export default config;
