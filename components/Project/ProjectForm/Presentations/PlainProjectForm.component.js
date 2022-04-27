import { Box, Button, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React from 'react';
import ProjectCorePresentationsHolder from '../Sections/Previews/ProjectCorePresentationsHolder.component';
import ProjectCoreData from '../Sections/ProjectCoreData.component';

const PlainProjectForm = ({ formData, onFormChange, className }) => {
  const isNotMobile = useMediaQuery('(min-width:600px)');

  return (
    <Box
      className={`PlainProjectForm PlainProjectForm__Container ${className}`}
    >
      <Box className="ProjectForm__PlainForm__Section">
        <Typography
          className="ProjectForm__PlainForm__Section__Title"
          variant="subtitle1"
          color="primary"
        >
          Project Name
        </Typography>
        <ProjectCoreData
          formData={formData}
          onFormChange={onFormChange}
          isNotMobile={isNotMobile}
        />
      </Box>
      <Box className="ProjectForm__PlainForm__Section">
        <Typography
          className="ProjectForm__PlainForm__Section__Title"
          variant="subtitle1"
          color="primary"
        >
          Presentations
        </Typography>
        <ProjectCorePresentationsHolder
          formData={formData}
          isNotMobile={isNotMobile}
        />
      </Box>
      <Box className="ProjectForm__PlainForm__Section">
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Save
        </Button>
      </Box>
    </Box>
  );
};

PlainProjectForm.defaultProps = {
  className: '',
};

PlainProjectForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default PlainProjectForm;
