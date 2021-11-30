import axios from 'axios';

export const oauthCallbacksConfig = {
  jwt(token, user, account) {
    console.log('TODO CHECK IF NECESARRY WITH DB STRATEGY');
    if (account && user) {
      return {
        accessToken: account.accessToken,
        accessTokenExpires: Date.now() + account.expires_in * 1000,
        refreshToken: account.refresh_token,
        uid: account.id,
        user,
      };
    }
    // Return previous token if the access token has not expired yet
    if (Date.now() < token.accessTokenExpires) {
      return token;
    }
    // Access token has expired, try to update it
    return {
      ...refreshAccessToken(token),
      uid: token.uid,
      user: token.user,
    };
  },
  session(session, token, other) {
    return session;
  },
};

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    const params = new URLSearchParams();
    params.append('client_id', oauthConfig.clientId);
    params.append('client_secret', oauthConfig.clientSecret);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', token.refreshToken);
    const response = await axios.post(oauthConfig.accessTokenUrl, params);

    if (response.status >= 300) {
      throw new Error('Error refreshing token');
    }

    let accessTokenBody = response.data;
    return {
      ...accessTokenBody,
      accessToken: accessTokenBody.access_token,
      accessTokenExpires: Date.now() + accessTokenBody.expires_in * 1000,
      refreshToken: accessTokenBody.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const oauthFrameworkConfig = {
  debug:
    process.env.A6_APP_OAUTH_FW_DEBUG &&
    process.env.A6_APP_OAUTH_FW_DEBUG === 'true',
  jwt: {
    secret: process.env.A6_APP_OAUTH_JWT_SECRET || 'jw7Secre7',
  },
  secret: process.env.A6_APP_MAIN_SECRET || 'aSecre7',
  session: {
    strategy: 'database',
  },
};

const oauthConfig = {
  id: 'angorasixkeycloak',
  name: 'AngorasixKeycloak',
  type: 'oauth',
  version: '2.0',
  wellKnown:
    process.env.A6_APP_OAUTH_PROVIDER_DISCOVERY_ENDPOINT ||
    '/myrealm/.well-known/openid-configuration',
  authorization: {
    url: process.env.A6_APP_OAUTH_PROVIDER_AUTHORIZATION_ENDPOINT || undefined,
    params: {
      scope:
        process.env.A6_APP_OAUTH_PROVIDER_AUTHORIZATION_SCOPES ||
        'openid email profile',
    },
  },
  token: process.env.A6_APP_OAUTH_PROVIDER_TOKEN_ENDPOINT || undefined,
  userinfo: process.env.A6_APP_OAUTH_PROVIDER_USERINFO_ENDPOINT || undefined,
  idToken: true,
  issuer: process.env.A6_APP_OAUTH_PROVIDER_ISSUER || 'realms/myrealm/',
  checks: ['pkce', 'state'],
  async profile(profile, tokens) {
    return {
      id: profile.sub,
      uid: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    };
  },

  clientId: process.env.A6_APP_OAUTH_CLIENT_ID || 'clientId',
  clientSecret: process.env.A6_APP_OAUTH_CLIENT_SECRET || 'clientSecret',
};

export default oauthConfig;
