const USER_LOGIN = 'USER/USER_LOGIN';
const USER_LOGOUT = 'USER/USER_LOGOUT';

// ACTIONS
export const loginAction = (payload = null) => ({ type: USER_LOGIN, payload });
export const logoutAction = () => ({ type: USER_LOGOUT });

const INITIAL_STATE = null;

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default UserReducer;
