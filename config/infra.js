class Infra {
  constructor(env) {
    this.isGoogleCloudRun = env.AN_APP_INFRA_IS_GOOGLE_CLOUD_RUN === 'true';
  }
}

export default Infra;
