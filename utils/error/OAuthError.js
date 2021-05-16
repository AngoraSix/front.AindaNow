class OAuthError extends Error {
  constructor(
    message = 'OAuth Error',
    name = 'OAUTH_ERROR',
    ...args
  ) {
    super(...args);

    this.name = name;
    this.message = message;

    Error.captureStackTrace(this, OAuthError);
  }
}

export default OAuthError;
