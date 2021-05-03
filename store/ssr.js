export const LOAD_SSR_DATA = 'SSR/LOAD_SSR_DATA';

export const loadSSRData = (payload = {}) => ({ type: LOAD_SSR_DATA, payload });

const INITIAL_STATE = {};

const ssrReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SSR_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default ssrReducer;
