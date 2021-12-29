import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from '@mui/material';
import { PROJECT_PRESENTATION_BASE_FORM_PROPS as PRESENTATION_BASE_PROPS } from '../ProjectForm.properties';

const ProjectPresentationData = ({ formData, onFormChange }) => {
  return (
    <div className="ProjectPresentationData ProjectPresentationData__Container">
      <div className="ProjectForm__Row ProjectForm__Row--21">
        <TextField
          {...PRESENTATION_BASE_PROPS.description}
          value={formData.name}
          onChange={onFormChange('presentation.description')}
        />
      </div>
    </div>
  );
};

ProjectPresentationData.defaultProps = {
  formData: {},
};

ProjectPresentationData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
};

export default ProjectPresentationData;
