import { REQUIRED_SECTIONS } from './ProjectPresentationForm.properties';

const UPDATE_FIELDS = 'ProjectPresentationForm/UPDATE_FIELDS';
const UPDATE_FORM_WAS_SUBMITTED =
  'ProjectPresentationForm/UPDATE_FORM_WAS_SUBMITTED';
const UPDATE_COMPLETED_FORM_SECTION =
  'ProjectPresentationForm/UPDATE_COMPLETED_FORM_SECTION';

export const updateFieldsAction = (payload) => ({
  type: UPDATE_FIELDS,
  payload,
});

export const updateFormWasSubmitted = (payload) => ({
  type: UPDATE_FORM_WAS_SUBMITTED,
  payload,
});

export const updatedCompletedFormSection = (section, isCompleted) => ({
  type: UPDATE_COMPLETED_FORM_SECTION,
  payload: { section, isCompleted },
});

export const INITIAL_STATE = {
  formData: {},
  completedSections: {
    [REQUIRED_SECTIONS.CORE]: false,
    [REQUIRED_SECTIONS.SECTIONS]: false,
  },
  wasSubmitted: false,
};

const ProjectPresentationFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIELDS:
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case UPDATE_COMPLETED_FORM_SECTION:
      return {
        ...state,
        completedSections: {
          ...state.completedSections,
          [action.payload.section]: action.payload.isCompleted,
        },
      };
    case UPDATE_FORM_WAS_SUBMITTED:
      return {
        ...state,
        wasSubmitted: action.payload,
      };
    default:
      return state;
  }
};

export default ProjectPresentationFormReducer;
