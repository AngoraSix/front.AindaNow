import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import config from '../../config';
import OAuthReducer, { initiated, receivedAuthCode } from '../../store/oauth';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState
} from '../../utils/oauth';
import Login from './Login.component';

const LoginContainer = () => {
  //   const { query } = useRouter();
  // // const {signingRedirectCallback } = useOAuthContext();
  // // signingRedirectCallback();
  console.log('EN CONTAINER!');
  console.log(accessToken);
  // console.log(config.crypto);
  // setAuthCookie("asd");

  const [oauthState, dispatch] = useReducer(OAuthReducer, {
    ...INITIAL_STATE,
    data,
  });

  useEffect(() => {
    // clean event listener on unmount
    return () => {
      window.removeEventListener('message', onChildResponseFn);
      // if (refTokenRefreshTimeout.current) clearTimeout(refTokenRefreshTimeout.current);
    };
  }, []);

  const onLoginClick = async () => {
    const stateParam = generateState();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const queryParamsObject = {
      client_id: config.oauth.oauthConfig.clientId,
      response_type: 'code',
      scope: config.oauth.oauthConfig.scopes,
      redirect_uri: config.oauth.oauthConfig.redirectUri,
      state: stateParam,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    };
    const params = new URLSearchParams();
    Object.entries(queryParamsObject).forEach(([key, value]) =>
      params.append(key, value)
    );
    const authorizationURL = `${
      config.oauth.providerConfig.authorizationEndpoint
    }\?${params.toString()}`;

    window.addEventListener('message', onChildResponseFn, {
      once: true,
      capture: false,
    });
    let modalRef = window.open(
      authorizationURL,
      'external_login_page',
      'width=800,height=600,left=200,top=100'
    );
    dispatch(initiated({ stateParam, modalRef, codeVerifier }));
  };

  const onChildResponseFn = (e) => {
    const receivedValues = {
      receivedState: e.data.state,
      code: e.data.authCode,
    };
    const tokenRequestBody = {
      grant_type: 'authorization_code',
      redirect_uri: config.oauth.oauthConfig.redirectUri,
      code: receivedValues.code,
      code_verifier: oauthState.codeVerifier,
      client_id: config.oauth.oauthConfig.clientId,
    };
    dispatch(receivedAuthCode({ receivedState, code }));

    requestAccessToken(tokenRequestBody);
  };

  const requestAccessToken = (tokenRequestBody) => {
    let headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };
    const params = new URLSearchParams();
    Object.entries(tokenRequestBody).forEach(([key, value]) => params.append(key, value));
    let {data: tokenResponse} = axios
      .post(config.oauth.providerConfig.tokenEndpoint, params, { headers });

        const newAuth = tokenResponse.data;
        console.log('4- Received Access Token:', newAuth);
        setTimeoutForRefreshToken(newAuth);
        fetchUserInfo(newAuth);
        setAuth(newAuth);
      //finally
        if (refAuthRequest.current.state) {
          setModal(null);
          setCurrentView(VIEWS.PROJECTS);
          setAuthRequest({
            codeVerifier: '',
            state: '',
          });
        }
  };

  // const onSearch = async (value) => {
  //   const {
  //     total,
  //     page,
  //     limit,
  //     search,
  //     data: vehicles,
  //   } = await api.vehicles.listCompanyVehicles(companyId, {
  //     search: value,
  //   });

  //   dispatch(updateDataAction({ total, page, limit, search, vehicles }));
  // };

  return (
    <Login
      {...state.data}
      onLoginClick={onLoginClick}
      // onSearch={onSearch}
    />
  );
};

LoginContainer.defaultProps = {
  accessToken: 'bbbbb',
};

LoginContainer.propTypes = {
  accessToken: PropTypes.string,
};

export default LoginContainer;
