export const PROJECT_CORE_FORM_FIELDS = {
  name: {
    key: 'name',
    label: 'A great new Project',
    required: true,
  },
};

export const PROJECT_PRESENTATION_BASE_FORM_FIELDS = {
  description: {
    key: 'description',
    label: 'Project description',
    multiline: true,
    minRows: 3,
  },
  objective: {
    key: 'objective',
    label: 'Objective',
    multiline: true,
    minRows: 3,
  },
  media: {
    key: 'media',
    label: 'Add Media',
  },
};

export const PROJECT_PRESENTATION_ADDITIONAL_FORM_FIELDS = {
  title: {
    key: 'title',
    label: 'Project name',
    required: true,
  },
};

export const PROJECT_PRESENTATION_PARAMS_FIELDS = {
  location: {
    key: 'location',
    label: 'Location',
  },
  technologies: {
    key: 'skills',
    label: 'Skills',
  },
};

export const PROJECT_PRESENTATION_REQUIRED_FIELDS = {
  title: {
    ...PROJECT_PRESENTATION_ADDITIONAL_FORM_FIELDS.title,
    mapFromProject: (project) => project[PROJECT_CORE_FORM_FIELDS.name.key],
  },
};

export default {
  core: PROJECT_CORE_FORM_FIELDS,
  presentationBase: PROJECT_PRESENTATION_BASE_FORM_FIELDS,
  presentationAdditional: PROJECT_PRESENTATION_ADDITIONAL_FORM_FIELDS,
  presentationParams: PROJECT_PRESENTATION_PARAMS_FIELDS,
};
