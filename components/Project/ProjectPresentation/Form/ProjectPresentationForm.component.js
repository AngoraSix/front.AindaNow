import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ProjectPresentationCoreData from './Sections/ProjectPresentationCoreData.component';

const ProjectPresentationForm = ({ formData, onFormChange }) => {
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
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Save
        </Button>
      </Box>
    </Box>
  );
};

ProjectPresentationForm.defaultProps = {};

ProjectPresentationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
};

export default ProjectPresentationForm;
