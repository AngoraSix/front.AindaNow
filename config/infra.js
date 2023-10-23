class Infra {
  constructor(env) {
    console.log('GERGERGERCONFIGS');
    console.log(env.AN_APP_CONFIG_IMAGES_ALLOWEDDOMAINS);
    console.log(env.AN_APP_CONFIG_IMAGES_ALLOWEDDOMAINS?.split(','));
    console.log(env.AN_APP_CONFIG_IMAGES_ALLOWEDDOMAINS);
    console.log(env);
    this.googleCloudRunAuthEnabled =
      env.AN_APP_INFRA_GOOGLE_CLOUDRUN_AUTH_ENABLED === 'true';
  }
}

export default Infra;
