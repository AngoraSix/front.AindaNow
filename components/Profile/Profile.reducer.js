const UPDATE_ATTRIBUTES = 'Profile/UPDATE_ATTRIBUTES';

export const updateAttributesAction = (payload) => ({
  type: UPDATE_ATTRIBUTES,
  payload,
});

export const INITIAL_STATE = {
  attributes: {},
};

const ProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ATTRIBUTES:
      return {
        ...state,
        attributes: action.payload,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
