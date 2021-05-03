class OAuth {
  constructor(env) {
    (this.oauthConfig = {
      // authority: env.REACT_APP_AUTH_URL || "localhost:9081/oauth/auth",
      // client_id: env.REACT_APP_IDENTITY_CLIENT_ID || "clientId",
      // redirect_uri: env.REACT_APP_REDIRECT_URL || "localhost:9080/oauth/login/callback",
      // login: env.REACT_APP_AUTH_URL  || "localhost:9081/oauth/login",
      // automaticSilentRenew: env.REACT_APP_AUTOMATIC_SILENT_RENEW || false,
      // loadUserInfo: env.REACT_APP_LOAD_USERINFO || false,
      // silent_redirect_uri: env.REACT_APP_SILENT_REDIRECT_URL || "localhost:9080/oauth/renew/callback",
      // post_logout_redirect_uri: env.REACT_APP_LOGOUT_REDIRECT_URL || "localhost:9081/oauth/logout",
      // audience: env.REACT_APP_AUDIENCE || "https://example.com",
      // responseType: env.REACT_APP_RESPONSE_TYPE || "id_token token",
      // grantType: env.REACT_APP_GRANT_TYPE || "authorization_code",
      // scope: env.REACT_APP_SCOPE || "openid",
      // webAuthResponseType: env.REACT_APP_WEB_RESPONSE_TYPE || "id_token token"
      clientId: env.OAUTH_CLIENT_ID || 'clientId',
      redirectUri: env.OAUTH_REDIRECT_URI || 'http://localhost:5000/callback',
      clientSecret: env.OAUTH_CLIENT_SECRET || 'clientSecret',
    }),
      (this.providerConfig = {
        issuer: env.OAUTH_ISSUER || 'http://localost:9081',
        // jwks_uri: env.REACT_APP_AUTH_URL + "/.well-known/openid-configuration/jwks",
        // authorization_endpoint: env.REACT_APP_AUTH_URL + "/connect/authorize",
        // token_endpoint: env.REACT_APP_AUTH_URL + "/connect/token",
        // userinfo_endpoint: env.REACT_APP_AUTH_URL + "/connect/userinfo",
        // end_session_endpoint: env.REACT_APP_AUTH_URL + "/connect/endsession",
        // check_session_iframe: env.REACT_APP_AUTH_URL + "/connect/checksession",
        // revocation_endpoint: env.REACT_APP_AUTH_URL + "/connect/revocation",
        // introspection_endpoint: env.REACT_APP_AUTH_URL + "/connect/introspect"
        authorizationEndpoint:
          env.OAUTH_PROVIDER_AUTHORIZATION_ENDPOINT ||
          '/myrealm/protocol/openid-connect/auth',
        tokenEndpoint:
          env.OAUTH_PROVIDER_TOKEN_ENDPOINT ||
          '/myrealm/protocol/openid-connect/token',
      });
  }
}

export default OAuth;
