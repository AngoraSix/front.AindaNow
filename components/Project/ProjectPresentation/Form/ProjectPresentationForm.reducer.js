const UPDATE_FIELDS = 'ProjectPresentationForm/UPDATE_FIELDS';

export const updateFieldsAction = (payload) => ({
  type: UPDATE_FIELDS,
  payload,
});

export const INITIAL_STATE = {};

const ProjectPresentationFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIELDS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default ProjectPresentationFormReducer;
