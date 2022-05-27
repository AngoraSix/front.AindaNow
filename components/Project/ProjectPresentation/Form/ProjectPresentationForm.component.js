import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ProjectPresentationCoreData from './Sections/ProjectPresentationCoreData.component';
import ProjectPresentationsSectionsData from './Sections/ProjectPresentationsSectionsData.component';

const ProjectPresentationForm = ({ formData, onFormChange, onSubmit }) => {
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
          Presentation Reference Name
        </Typography>
        <ProjectPresentationCoreData
          formData={formData}
          onFormChange={onFormChange}
          wasSubmitted={false}
        />
      </Box>
      <Box className="ProjectPresentationForm__Section">
        <Typography
          className="ProjectPresentationForm__Section__Sections"
          variant="subtitle1"
          color="primary"
        >
          Presentation Sections
        </Typography>
        <ProjectPresentationsSectionsData
          formData={formData}
          onFormChange={onFormChange}
          wasSubmitted={false}
        />
      </Box>
      <Box className="ProjectPresentationForm__Section">
        <Button
          type="submit"
          onClick={onSubmit}
          color="primary"
          variant="contained"
          fullWidth
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

ProjectPresentationForm.defaultProps = {
  projectPresentations: {},
};

ProjectPresentationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  projectPresentation: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProjectPresentationForm;
