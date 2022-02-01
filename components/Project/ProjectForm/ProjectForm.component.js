import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PlainProjectForm from './Presentations/PlainProjectForm.component';
import SteppedProjectForm from './Presentations/SteppedProjectForm.component';

const ProjectForm = ({ project, className, onSubmit, stepped }) => {
  const [formData, setFormData] = useState(project);

  const onFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  const onFormChange = (property) => (event) => {
    if (!event) {
      return false;
    }
    let value = event.target?.value || event;

    const partialFormData = {
      [property]: value,
    };

    setFormData({ ...formData, ...partialFormData });
  };

  const FormPresentation = stepped ? SteppedProjectForm : PlainProjectForm;

  return (
    <div className={`ProjectForm ProjectForm__Container ${className}`}>
      <form onSubmit={onFormSubmit}>
        <FormPresentation onFormChange={onFormChange} formData={formData} />
      </form>
    </div>
  );
};

ProjectForm.defaultProps = {
  className: 'ProjectForm__Default',
  project: {},
  stepped: false,
};

ProjectForm.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  stepped: PropTypes.bool,
};

export default ProjectForm;
