import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SteppedProjectForm from './Presentations/SteppedProjectForm.component';
import PlainProjectForm from './Presentations/PlainProjectForm.component';
import PROJECT_FORM_PROPS from './ProjectForm.properties';

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

  const onFormChange = (property) => (event, customEvent) => {
    if (!event) {
      return false;
    }
    let {
      target: { value },
    } = event;

    const ON_CHANGE_MAP = {
      images: resolveImagesChange,
      multiple: resolveMultipleChange,
      boolean: resolveBooleanChange,
    };

    const propertyType =
      PROJECT_FORM_PROPS[property] && PROJECT_FORM_PROPS[property].type
        ? PROJECT_FORM_PROPS[property].type
        : 'object';

    const onChangeFn =
      ON_CHANGE_MAP[propertyType.toLowerCase()] ||
      ON_CHANGE_MAP[property.toLowerCase()];

    let partialFormData = {};

    if (onChangeFn) {
      partialFormData = onChangeFn(property, value, customEvent);
    } else {
      partialFormData = {
        [property]: value,
      };
    }

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
