import OAuthError from '../utils/error/OAuthError';

const OAUTH_INITIATED = 'OAUTH/OAUTH_INITIATED';
const OAUTH_RECEIVED_AUTH_CODE = 'OAUTH/OAUTH_RECEIVED_AUTH_CODE';
const OAUTH_EXCHANGED_CODE = 'OAUTH/OAUTH_EXCHANGED_CODE';

// ACTIONS
export const initiated = (payload) => ({
  type: OAUTH_INITIATED,
  payload,
});
export const receivedAuthCode = (payload) => ({
  type: OAUTH_RECEIVED_AUTH_CODE,
  payload,
});
export const exchangedCode = (payload) => ({
  type: OAUTH_EXCHANGED_CODE,
  payload,
});

const INITIAL_STATE = {
  codeVerifier: null,
  stateParam: null,
  modalRef: null,
  authCode: null,
  accessToken: null,
  error: null,
  exchangingCode: false,
};

const OAuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OAUTH_INITIATED:
      const { codeVerifier, stateParam, modalRef } = action.payload;
      return {
        ...INITIAL_STATE,
        codeVerifier,
        stateParam,
        modalRef,
      };
    case OAUTH_RECEIVED_AUTH_CODE:
      if (payload.receivedState !== state.stateParam) {
        throw new OAuthError('Invalid state', 'STATE_INVALID');
      }
      return {
        ...state,
        codeVerifier: null,
        stateParam: null,
        modalRef: null,
        authCode: payload.code,
        exchangingCode: true,
      };
    case OAUTH_EXCHANGED_CODE:
      return {
        ...INITIAL_STATE,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

export default OAuthReducer;
