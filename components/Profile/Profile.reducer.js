const UPDATE_DATA = 'Profile/UPDATE_DATA';

export const updateDataAction = (payload) => ({ type: UPDATE_DATA, payload });

export const INITIAL_STATE = {
  data: {},
};

const ProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
