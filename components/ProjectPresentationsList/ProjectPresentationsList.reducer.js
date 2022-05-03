const UPDATE_DATA = 'ProjectPresentationsList/UPDATE_DATA';

export const updateDataAction = (payload) => ({ type: UPDATE_DATA, payload });

export const INITIAL_STATE = {
  total: 0,
  page: 1,
  limit: 10,
  search: '',
  projectPresentationsList: [],
};

const ProjectPresentationsListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default ProjectPresentationsListReducer;
