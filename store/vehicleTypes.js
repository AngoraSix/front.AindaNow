const VEHICLE_TYPES_LOAD = 'VEHICLE_TYPES/VEHICLE_TYPES_LOAD';

// ACTIONS
export const loadVehicleTypesAction = (payload) => ({
  type: VEHICLE_TYPES_LOAD,
  payload,
});

const INITIAL_STATE = {
  data: [],
  map: {},
};

const VehicleTypesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VEHICLE_TYPES_LOAD:
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

export default VehicleTypesReducer;
