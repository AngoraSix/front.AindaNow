const BRANDS_LOAD = 'BRANDS/BRANDS_LOAD';

// ACTIONS
export const loadBrandsAction = (payload) => ({
  type: BRANDS_LOAD,
  payload,
});

const INITIAL_STATE = {
  data: [],
  map: {},
};

const BrandsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BRANDS_LOAD:
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

export default BrandsReducer;
