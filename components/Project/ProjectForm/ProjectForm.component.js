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

  const resolveBooleanChange = (property) => {
    const newValue = !formData[property];

    return {
      [property]: newValue,
    };
  };

  const resolveMultipleChange = (property, value) => {
    const propertyData = [].concat(formData[property] || []);
    const index = propertyData.indexOf(value);
    if (index >= 0) {
      propertyData.splice(index, 1);
    } else {
      propertyData.push(value);
    }

    return {
      [property]: propertyData,
    };
  };

  const resolveImagesChange = (property, value, customEvent) => {
    let imageChanges = {
      [property]: value,
    };

    if (
      formData.thumbnailImages &&
      customEvent &&
      customEvent.type === 'DND_UPDATE'
    ) {
      const result = [...formData.thumbnailImages];
      const [removed] = result.splice(customEvent.source, 1);
      result.splice(customEvent.destination, 0, removed);

      imageChanges.thumbnailImages = result;
    }

    return imageChanges;
  };

  const onFormChange = (property) => (event) => {
    if (!event) {
      return false;
    }
    let {
      target: { value },
    } = event;

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
