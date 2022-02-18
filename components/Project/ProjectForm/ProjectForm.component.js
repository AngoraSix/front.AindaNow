import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import ProjectFormReducer, {
  INITIAL_STATE,
  updateFieldsAction,
} from './ProjectForm.reducer';
import PlainProjectForm from './Presentations/PlainProjectForm.component';
import SteppedProjectForm from './Presentations/SteppedProjectForm.component';

const ProjectForm = ({ project, className, onSubmit, stepped }) => {
  const [formData, dispatch] = useReducer(ProjectFormReducer, {
    ...INITIAL_STATE,
    ...(project || {}),
  });

  const onFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  const onFormChange = (property) => (eventOrValue) => {
    const partialFormData = {
      [property]: eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue,
    };

    dispatch(updateFieldsAction(partialFormData));
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
