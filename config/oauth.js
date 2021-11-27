export const oauthFrameworkConfig = {
  debug:
    process.env.A6_APP_OAUTH_FW_DEBUG &&
    process.env.A6_APP_OAUTH_FW_DEBUG === 'true',
  jwt: {
    secret: process.env.A6_APP_OAUTH_JWT_SECRET = "aSecre7"
  }
};

const oauthConfig = {
  id: 'angorasixkeycloak',
  name: 'AngorasixKeycloak',
  type: 'oauth',
  version: '2.0',
  scope: process.env.A6_APP_OAUTH_CLIENT_SCOPES || 'profile openid',
  params: { grant_type: 'authorization_code' },
  idToken: true,
  accessTokenUrl:
    process.env.A6_APP_OAUTH_PROVIDER_TOKEN_ENDPOINT ||
    '/myrealm/protocol/openid-connect/token',
  requestTokenUrl:
    process.env.A6_APP_OAUTH_PROVIDER_REQUESTTOKEN_ENDPOINT ||
    '/myrealm/protocol/openid-connect/auth',
  authorizationUrl:
    process.env.A6_APP_OAUTH_PROVIDER_AUTHORIZATION_ENDPOINT ||
    '/myrealm/protocol/openid-connect/auth?response_type=code',
  profileUrl:
    process.env.A6_APP_OAUTH_PROVIDER_USERINFO_ENDPOINT ||
    '/myrealm/protocol/openid-connect/userinfo',
  async profile(profile, tokens) {
    // You can use the tokens, in case you want to fetch more profile information
    // For example several OAuth providers do not return email by default.
    // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      ger: profile
    };
  },
  clientId: process.env.A6_APP_OAUTH_CLIENT_ID || 'clientId',
  clientSecret: process.env.A6_APP_OAUTH_CLIENT_SECRET || 'clientSecret',
};

export default oauthConfig;
