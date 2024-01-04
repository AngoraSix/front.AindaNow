class ServicesDefaults {
  constructor(env) {
    this.mgmt = {
      mgmtInitialStatus:
        env.AN_APP_SERVICES_DEFAULTS_MGMT_INITIAL_STATUS || 'IDEA',
    };
  }
}

export default ServicesDefaults;
