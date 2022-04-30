import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import PlainProjectForm from './Strategies/PlainProjectForm.component';
import SteppedProjectForm from './Strategies/SteppedProjectForm.component';

const ProjectForm = ({
  className,
  formData,
  onFormChange,
  onSubmit,
  stepped,
}) => {
  const onFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  const FormPresentation = stepped ? SteppedProjectForm : PlainProjectForm;

  return (
    <Box className={`ProjectForm ProjectForm__Container ${className}`}>
      <form onSubmit={onFormSubmit}>
        <FormPresentation onFormChange={onFormChange} formData={formData} />
      </form>
    </Box>
  );
};

ProjectForm.defaultProps = {
  className: 'ProjectForm__Default',
  formData: {},
  stepped: false,
};

ProjectForm.propTypes = {
  className: PropTypes.string,
  formData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
  stepped: PropTypes.bool,
};

export default ProjectForm;
