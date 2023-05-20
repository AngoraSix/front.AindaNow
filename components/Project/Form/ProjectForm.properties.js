export const PROJECT_CORE_FORM_FIELDS = {
  name: {
    key: 'name',
    label: 'projects.edit.form.wizard-fields.project-name',
    required: true,
  },
};

export const PROJECT_PRESENTATION_SECTION_BASE_FORM_FIELDS = {
  description: {
    key: 'description',
    label: 'project-presentations.edit.form.wizard-fields.description',
    multiline: true,
    minRows: 3,
    required: false,
  },
  mainMedia: {
    key: 'mainMedia',
    label: 'project-presentations.edit.form.wizard-fields.mainMedia',
    required: true,
  },
  media: {
    key: 'media',
    label: 'project-presentations.edit.form.wizard-fields.media',
  },
};

export const PROJECT_PRESENTATION_PARAMS_FIELDS = {
  language: {
    key: 'language',
    label: 'project-presentations.edit.form.wizard-fields.language',
  },
  skills: {
    key: 'skills',
    label: 'project-presentations.edit.form.wizard-fields.skills',
  },
};

const projectFormProperties = {
  core: PROJECT_CORE_FORM_FIELDS,
  section: PROJECT_PRESENTATION_SECTION_BASE_FORM_FIELDS,
  presentationParams: PROJECT_PRESENTATION_PARAMS_FIELDS,
};

export default  projectFormProperties;
