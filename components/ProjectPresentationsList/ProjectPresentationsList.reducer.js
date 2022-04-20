const UPDATE_DATA = 'ProjectPresentationsList/UPDATE_DATA';

export const updateDataAction = (payload) => ({ type: UPDATE_DATA, payload });

export const INITIAL_STATE = {
  data: {},
};

const ProjectPresentationsListReducer = (state = INITIAL_STATE, action) => {
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

export default ProjectPresentationsListReducer;
