export const PROJECT_CORE_FORM_PROPS = {
  name: {
    key: 'name',
    label: 'A great new Project',
    required: true,
  },
};

export const PROJECT_PRESENTATION_BASE_FORM_PROPS = {
  description: {
    key: 'description',
    label: 'Project description',
    required: true,
  },
};

export const PROJECT_PRESENTATION_ADDITIONAL_FORM_PROPS = {
  title: {
    key: 'title',
    label: 'Project name',
    required: true,
  },
};

export default {
  core: PROJECT_CORE_FORM_PROPS,
  presentationBase: PROJECT_PRESENTATION_BASE_FORM_PROPS,
  presentationAdditional: PROJECT_PRESENTATION_ADDITIONAL_FORM_PROPS,
};
