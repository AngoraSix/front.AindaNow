import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@mui/material';
import ProjectCoreData from '../Sections/ProjectCoreData.component';
import ProjectPresentationData from '../Sections/ProjectPresentationData.component';

const PlainProjectForm = ({ formData, onFormChange, className }) => (
  <div className={`PlainProjectForm PlainProjectForm__Container ${className}`}>
    <Typography variant="subtitle1" color="primary">
      Project
    </Typography>
    <ProjectCoreData formData={formData} onFormChange={onFormChange} />
    <ProjectPresentationData formData={formData} onFormChange={onFormChange} />
    <div>
      <Button type="submit" color="primary" variant="contained" fullWidth>
        Save
      </Button>
    </div>
  </div>
);

PlainProjectForm.defaultProps = {
  className: '',
};

PlainProjectForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default PlainProjectForm;
