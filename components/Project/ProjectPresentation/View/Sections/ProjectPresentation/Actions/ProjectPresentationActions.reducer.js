const UPDATE_FIELD = 'ProjectPresentationActions/UPDATE_FIELD';
const UPDATE_CLUB_ACTIONS = 'ProjectPresentationActions/UPDATE_CLUB_ACTIONS';
const UPDATE_PROJECTPRESENTATION_ACTIONS =
  'ProjectPresentationActions/UPDATE_PROJECTPRESENTATION_ACTIONS';
const UPDATE_MANAGEMENT_ACTIONS = 'ProjectPresentationActions/UPDATE_MANAGEMENT_ACTIONS';

export const updateFieldAction = (payload) => ({
  type: UPDATE_FIELD,
  payload,
});

export const updateClubActions = (payload) => ({
  type: UPDATE_CLUB_ACTIONS,
  payload,
});

export const updateManagementActions = (payload) => ({
  type: UPDATE_MANAGEMENT_ACTIONS,
  payload,
})

export const updateProjectPresentationActions = (payload) => ({
  type: UPDATE_PROJECTPRESENTATION_ACTIONS,
  payload,
});

export const INITIAL_STATE = {
  actionData: {},
  projectPresentationActions: {},
  clubActions: {},
  managementActions: {},
};

const ProjectPresentationActionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        actionData: { ...state.actionData, ...action.payload },
      };
    case UPDATE_MANAGEMENT_ACTIONS:
      return {
        ...state,
        managementActions: action.payload
      }
    case UPDATE_CLUB_ACTIONS:
      return {
        ...state,
        clubActions: {
          ...state.clubActions,
          ...action.payload,
        },
      };
    case UPDATE_PROJECTPRESENTATION_ACTIONS:
      return {
        ...state,
        projectPresentationActions: action.payload,
      };
    default:
      return state;
  }
};

export default ProjectPresentationActionsReducer;
