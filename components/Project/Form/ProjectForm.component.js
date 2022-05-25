import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import PlainProjectForm from './Strategies/PlainProjectForm.component';
import SteppedProjectForm from './Strategies/SteppedProjectForm.component';

const ProjectForm = ({
  formData,
  project,
  onFormChange,
  onSubmit,
  stepped,
}) => {
  const onFormSubmit = (event) => {
    event.preventDefault();

    onSubmit();
  };

  const FormPresentation = stepped ? SteppedProjectForm : PlainProjectForm;

  return (
    <Box className={`ProjectForm ProjectForm__Section__Container`}>
      <form onSubmit={onFormSubmit}>
        <FormPresentation
          onFormChange={onFormChange}
          formData={formData}
          project={project}
        />
      </form>
    </Box>
  );
};

ProjectForm.defaultProps = {
  className: 'ProjectForm__Default',
  formData: {},
  project: {},
  stepped: false,
};

ProjectForm.propTypes = {
  className: PropTypes.string,
  formData: PropTypes.object,
  project: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
  stepped: PropTypes.bool,
};

export default ProjectForm;
