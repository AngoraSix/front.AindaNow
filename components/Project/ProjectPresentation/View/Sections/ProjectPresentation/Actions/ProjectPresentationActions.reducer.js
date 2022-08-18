const UPDATE_FIELD = 'ProjectPresentationActions/UPDATE_FIELD';
const UPDATE_CLUB_ACTIONS = 'ProjectPresentationActions/UPDATE_CLUB_ACTIONS';
const UPDATE_PROJECTPRESENTATION_ACTIONS = 'ProjectPresentationActions/UPDATE_PROJECTPRESENTATION_ACTIONS';

export const updateFieldAction = (payload) => ({
  type: UPDATE_FIELD,
  payload,
});

export const UpdateClubActions = (payload) => ({
  type: UPDATE_CLUB_ACTIONS,
  payload,
});

export const UpdateProjectPresentationActions = (payload) => ({
  type: UPDATE_PROJECTPRESENTATION_ACTIONS,
  payload,
});

export const INITIAL_STATE = {
  actionData: {},
  projectPresentationActions: {},
  clubActions: {}
};

const ProjectPresentationActionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        actionData: { ...state.actionData, ...action.payload },
      };
    case UPDATE_CLUB_ACTIONS:
      return {
        ...state,
        clubActions:  action.payload,
      };
    case UPDATE_PROJECTPRESENTATION_ACTIONS:
      return {
        ...state,
        projectPresentationActions:  action.payload,
      };
    default:
      return state;
  }
};

export default ProjectPresentationActionsReducer;
