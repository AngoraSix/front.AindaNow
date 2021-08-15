import querystring from 'querystring';
import config from '../config';

class OAuthAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  setAuthorizationToken(token) {
    this.axios.setCommonHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  async exchangeAuthCode(authCode, redirectUri, clientId, clientSecret) {
    const { data } = await this.axios.post(
      config.oauth.providerConfig.tokenEndpoint,
      querystring.stringify({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: redirectUri,
        client_id: clientId,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            clientId + ':' + clientSecret
          ).toString('base64')}`,
        },
      }
    );

    console.log('POSTPOSTPOSTPOST');

    this.setAuthorizationToken(data.access_token);

    return data;
  }
}

export default OAuthAPI;
