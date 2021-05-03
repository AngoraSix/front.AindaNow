import PropTypes from 'prop-types';
import api from '../../../api';
import OAuthCallback from '../../../components/OAuthCallback';
import config from '../../../config';
import DefaultLayout from '../../../layouts/DefaultLayout';
import { setAuthCookie } from '../../../utils/cookies';
import { encrypt } from '../../../utils/crypto';

const OAuthLoginCallback = ({accessToken}) => {
  return (
    <DefaultLayout>
      <OAuthCallback accessToken={accessToken}/>
    </DefaultLayout>
  );
};

OAuthLoginCallback.defaultProps = {
  accessToken: null,
};

OAuthLoginCallback.propTypes = {
  accessToken: PropTypes.string,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  try {
    // const { query } = useRouter();
    console.log('EN SERVER SIDE!!');
    // console.log('ROUTER QUERY');
    // console.log(query);

    console.log('CTX PARAMS');
    console.log(ctx.query.code);

    const accessTokenResponse = await api.oauth.exchangeAuthCode(
      ctx.query.code,
      config.oauth.oauthConfig.redirectUri,
      config.oauth.oauthConfig.clientId,
      config.oauth.oauthConfig.clientSecret
    );

    const encryptedResponse = encrypt(
      JSON.stringify(accessTokenResponse),
      config.crypto
    );

    setAuthCookie(encryptedResponse);

    props.accessToken = accessTokenResponse.access_token;
  } catch (err) {
    console.log(
      `There has been an error with the OAuth response: ${err.message} - ${
        err.response && err.response.message
      }`
    );
  }
  return {
    props,
  };
};

export default OAuthLoginCallback;
