class Auth {
  constructor(env) {
    this.cookie = env.AUTH_COOKIE || 'auth_cookie';
  }
}

export default Auth;
