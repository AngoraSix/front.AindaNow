import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import { projectToForm } from '../../../../utils/converters/projectConverters';
import ProjectPresentationDialog from './Dialog';
import ProjectPresentationForm from './ProjectPresentationForm.component';
import ProjectPresentationFormReducer, {
  INITIAL_STATE,
  updateFieldsAction,
} from './ProjectPresentationForm.reducer';

const ProjectPresentationFormContainer = ({
  projectPresentation,
  isTriggeredAction,
}) => {
  const [formData, dispatch] = useReducer(ProjectPresentationFormReducer, {
    ...INITIAL_STATE,
    ...projectToForm(projectPresentation),
  });

  const onFormChange = (property) => (eventOrValue) => {
    const partialFormData = {
      [property]: eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue,
    };

    dispatch(updateFieldsAction(partialFormData));
  };

  return isTriggeredAction ? (
    <ProjectPresentationDialog projectId={projectPresentation.projectId}>
      <ProjectPresentationForm
        formData={formData}
        onFormChange={onFormChange}
      />
    </ProjectPresentationDialog>
  ) : (
    <ProjectPresentationForm formData={formData} onFormChange={onFormChange} />
  );
};

ProjectPresentationFormContainer.defaults = {
  isTriggeredAction: false,
};

ProjectPresentationFormContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isTriggeredAction: PropTypes.bool,
};

export default ProjectPresentationFormContainer;
