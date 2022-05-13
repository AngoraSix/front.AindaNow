export const PROJECT_CORE_FORM_FIELDS = {
  name: {
    key: 'name',
    label: 'A great new Project',
    required: true,
  },
};

export const PROJECT_PRESENTATION_SECTION_BASE_FORM_FIELDS = {
  description: {
    key: 'description',
    label: 'Project description',
    multiline: true,
    minRows: 3,
    required: false,
  },
  mainMedia: {
    key: 'mainMedia',
    label: 'Set Main Media',
    required: true,
  },
  media: {
    key: 'media',
    label: 'Add Media',
  },
};

export const PROJECT_PRESENTATION_SECTION_ADDITIONAL_FORM_FIELDS = {
  title: {
    key: 'title',
    label: 'Project name',
    required: true,
  },
  referenceName: {
    key: 'referenceName',
    label: 'Project Presentation Reference Name',
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

export default {
  core: PROJECT_CORE_FORM_FIELDS,
  section: {
    base: PROJECT_PRESENTATION_SECTION_BASE_FORM_FIELDS,
    additional: PROJECT_PRESENTATION_SECTION_ADDITIONAL_FORM_FIELDS,
  },
  presentationParams: PROJECT_PRESENTATION_PARAMS_FIELDS,
};
