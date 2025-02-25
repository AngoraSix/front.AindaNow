export const oauthFrameworkConfig = {
  debug:
    process.env.AN_APP_OAUTH_FW_DEBUG === 'true',
  jwt: {
    secret: process.env.AN_APP_OAUTH_JWT_SECRET || 'jw7Secre7',
  },
  secret: process.env.AN_APP_MAIN_SECRET || 'aSecre7',
  session: {
    strategy: 'jwt',
  },
};

/*
Not used -> now using built-in provider...does it provide token endpoint for refresh token?
*/
export const oauthProviderConfig = {
  id: 'angorasixspring',
  name: 'AngoraSixSpring',
  type: 'oauth',
  version: '2.0',
  // wellKnown:
  //   process.env.AN_APP_OAUTH_PROVIDER_DISCOVERY_ENDPOINT ||
  //   '/.well-known/openid-configuration',
  authorization: {
    url: process.env.AN_APP_OAUTH_PROVIDER_AUTHORIZATION_ENDPOINT || undefined,
    params: {
      scope:
        process.env.AN_APP_OAUTH_PROVIDER_AUTHORIZATION_SCOPES ||
        'openid email profile',
    },
  },
  token: process.env.AN_APP_OAUTH_PROVIDER_TOKEN_ENDPOINT || undefined,
  userinfo: process.env.AN_APP_OAUTH_PROVIDER_USERINFO_ENDPOINT || undefined,
  jwks_endpoint: process.env.AN_APP_OAUTH_PROVIDER_JWKS_ENDPOINT || undefined,
  idToken: true,
  issuer: process.env.AN_APP_OAUTH_PROVIDER_ISSUER || '/',
  checks: ['pkce', 'state'],
  async profile(profile, tokens) {
    return {
      id: profile.a6_contributor_id,
      givenName: profile.given_name,
      familyName: profile.family_name,
      email: profile.email,
      image: profile.a6_profile_image,
      imageThumbnail: profile.a6_profile_image_thumbnail,
      identityProvider: profile.identityProvider
    };
  },
  clientId: process.env.AN_APP_OAUTH_CLIENT_ID || 'clientId',
  clientSecret: process.env.AN_APP_OAUTH_CLIENT_SECRET || 'clientSecret',
};
