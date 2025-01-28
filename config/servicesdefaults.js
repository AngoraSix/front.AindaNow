import { getFromEnvsOrElse } from "../utils/config";

class ServicesDefaults {
  constructor(env) {
    this.mgmt = {
      mgmtInitialStatus:
        getFromEnvsOrElse(env, 'AN_APP_SERVICES_DEFAULTS_MGMT_INITIAL_STATUS', 'IDEA'),
    };
  }
}

export default ServicesDefaults;
