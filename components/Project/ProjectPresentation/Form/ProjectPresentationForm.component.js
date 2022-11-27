import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { REQUIRED_SECTIONS } from './ProjectPresentationForm.properties';
import ProjectPresentationCoreData from './Sections/ProjectPresentationCoreData.component';
import ProjectPresentationsSectionsData from './Sections/ProjectPresentationsSectionsData.component';

const ProjectPresentationForm = ({
  formData,
  onFormChange,
  onSubmit,
  wasSubmitted,
  setIsSectionCompleted,
}) => {
  const { t } = useTranslation('project-presentations.edit');

  return (
    <Box
      className={`ProjectPresentationForm ProjectPresentationForm__Container`}
    >
      <Box className="ProjectPresentationForm__Section">
        <Typography
          className="ProjectPresentationForm__Section__Name"
          variant="subtitle1"
          color="primary"
        >
          {t('project-presentations.edit.form.fields.reference-name')}
        </Typography>
        <ProjectPresentationCoreData
          formData={formData}
          onFormChange={onFormChange}
          setIsCompleted={setIsSectionCompleted(REQUIRED_SECTIONS.CORE)}
          wasSubmitted={wasSubmitted}
        />
      </Box>
      <Box className="ProjectPresentationForm__Section">
        <Typography
          className="ProjectPresentationForm__Section__Sections"
          variant="subtitle1"
          color="primary"
        >
          {t('project-presentations.edit.form.presentation-sections')}
        </Typography>
        <ProjectPresentationsSectionsData
          formData={formData}
          onFormChange={onFormChange}
          setIsCompleted={setIsSectionCompleted(REQUIRED_SECTIONS.SECTIONS)}
          wasSubmitted={wasSubmitted}
        />
      </Box>
      <Box className="ProjectPresentationForm__Section">
        <Button
          onClick={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          {t('project-presentations.edit.form.commands.save')}
        </Button>
      </Box>
    </Box>
  );
};

ProjectPresentationForm.defaultProps = {
  projectPresentations: {},
  wasSubmitted: false,
  setIsSectionCompleted: () => {},
};

ProjectPresentationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  projectPresentation: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  wasSubmitted: PropTypes.bool,
  setIsSectionCompleted: PropTypes.func,
};

export default ProjectPresentationForm;
