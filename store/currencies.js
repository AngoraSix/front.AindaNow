const CURRENCIES_LOAD = 'CURRENCIES/CURRENCIES_LOAD';

// ACTIONS
export const loadCurrenciesAction = (payload) => ({
  type: CURRENCIES_LOAD,
  payload,
});

const INITIAL_STATE = {
  data: [],
  map: {},
};

const CurrenciesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENCIES_LOAD:
      return {
        ...state,
        data: action.payload,
        map: action.payload.reduce((prev, current) => {
          prev[current.id] = current;
          return prev;
        }, {}),
      };

    default:
      return state;
  }
};

export default CurrenciesReducer;
