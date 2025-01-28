import { getFromEnvsOrElse } from "../utils/config";

class Infra {
  constructor(env) {
    this.googleCloudRunAuthEnabled =
      getFromEnvsOrElse(env, 'AN_APP_INFRA_GOOGLE_CLOUDRUN_AUTH_ENABLED') === 'true';
  }
}

export default Infra;
