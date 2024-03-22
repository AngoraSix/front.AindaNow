const UPDATE_FIELD = 'ProjectPluginsActions/UPDATE_FIELD';
const UPDATE_PROJECTPLUGINS_ACTIONS =
  'ProjectPluginsActions/UPDATE_PROJECTPLUGINS_ACTIONS';
const UPDATE_MANAGEMENT_ACTIONS =
  'ProjectPluginsActions/UPDATE_MANAGEMENT_ACTIONS';

export const updateFieldAction = (payload) => ({
  type: UPDATE_FIELD,
  payload,
});

export const updateManagementActions = (payload) => ({
  type: UPDATE_MANAGEMENT_ACTIONS,
  payload,
});

export const updateProjectPluginsActions = (payload) => ({
  type: UPDATE_PROJECTPLUGINS_ACTIONS,
  payload,
});

export const INITIAL_STATE = {
  actionData: {},
  projectPluginsActions: {},
  managementActions: {},
};

const ProjectPluginsActionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        actionData: { ...state.actionData, ...action.payload },
      };
    case UPDATE_MANAGEMENT_ACTIONS:
      return {
        ...state,
        managementActions: action.payload,
      };
    case UPDATE_PROJECTPLUGINS_ACTIONS:
      return {
        ...state,
        projectPluginsActions: action.payload,
      };
    default:
      return state;
  }
};

export default ProjectPluginsActionsReducer;
