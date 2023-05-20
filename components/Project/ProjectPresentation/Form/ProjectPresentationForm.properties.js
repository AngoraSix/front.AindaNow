export const PROJECT_PRESENTATION_CORE_FORM_FIELDS = {
  referenceName: {
    key: 'referenceName',
    label: 'project-presentations.edit.form.wizard-fields.reference-name',
    required: true,
  },
};

export const PROJECT_PRESENTATION_SECTION_FORM_FIELDS = {
  title: {
    key: 'title',
    label: 'project-presentations.edit.form.wizard-fields.section.title',
    required: true,
  },
  description: {
    key: 'description',
    label: 'project-presentations.edit.form.wizard-fields.section.description',
    multiline: true,
    minRows: 3,
    maxRows: 8,
    required: false,
  },
  mainMedia: {
    key: 'mainMedia',
    label: 'project-presentations.edit.form.wizard-fields.section.mainMedia',
    required: true,
  },
  media: {
    key: 'media',
    label: 'project-presentations.edit.form.wizard-fields.section.media',
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

const projectPresentationFormProperties = {
  core: PROJECT_PRESENTATION_CORE_FORM_FIELDS,
  section: PROJECT_PRESENTATION_SECTION_FORM_FIELDS,
  presentationParams: PROJECT_PRESENTATION_PARAMS_FIELDS,
  requiredSections: REQUIRED_SECTIONS,
};

export default projectPresentationFormProperties;
