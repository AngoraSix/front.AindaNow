export const PROJECT_PRESENTATION_CORE_FORM_FIELDS = {
  referenceName: {
    key: 'referenceName',
    label: 'Reference Name',
    required: true,
  },
};

export const PROJECT_PRESENTATION_SECTION_FORM_FIELDS = {
  title: {
    key: 'title',
    label: 'Presentation Section Title',
    required: true,
  },
  description: {
    key: 'description',
    label: 'Presentation Section Description',
    multiline: true,
    minRows: 3,
    maxRows: 8,
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

export const REQUIRED_SECTIONS = {
  CORE: 'CORE',
  SECTIONS: 'SECTIONS',
};

export default {
  core: PROJECT_PRESENTATION_CORE_FORM_FIELDS,
  section: PROJECT_PRESENTATION_SECTION_FORM_FIELDS,
  presentationParams: PROJECT_PRESENTATION_PARAMS_FIELDS,
  requiredSections: REQUIRED_SECTIONS,
};
