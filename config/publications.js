class Publications {
  constructor(env) {
    this.cookie = env.PUBLICATIONS_TOKEN_COOKIE || 'hoc_oauth_gateway_token';
  }
}

export default Publications;
