const UPDATE_PROFILE_FIELD = 'Profile/UPDATE_PROFILE_FIELD';

export const updateProfileField = (payload) => ({
  type: UPDATE_PROFILE_FIELD,
  payload,
});

export const INITIAL_STATE = {
  contributorProfile: {},
};

const ProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_FIELD:
      return {
        contributorProfile: { ...state.contributorProfile, ...action.payload },
      };
    default:
      return state;
  }
};

export default ProfileReducer;
