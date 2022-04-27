import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Box } from '@mui/material';
import ProjectCoreData from '../Sections/ProjectCoreData.component';
import ProjectCorePresentationsHolder from '../Sections/ProjectCorePresentationsHolder.component';
import useMediaQuery from '@mui/material/useMediaQuery';

const PlainProjectForm = ({ formData, onFormChange, className }) => {
  const isNotMobile = useMediaQuery('(min-width:600px)');

  return <Box className={`PlainProjectForm PlainProjectForm__Container ${className}`}>
    <Typography variant="subtitle1" color="primary">
      Project
    </Typography>
    <ProjectCoreData formData={formData} onFormChange={onFormChange} isNotMobile={isNotMobile} />
    <ProjectCorePresentationsHolder formData={formData} />
    <Box>
      <Button type="submit" color="primary" variant="contained" fullWidth>
        Save
      </Button>
    </Box>
  </Box>
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
