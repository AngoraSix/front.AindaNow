import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import ProjectPresentation from '../../../../models/ProjectPresentation';
import { createObjectWithFlatParams, toType } from '../../../../utils/helpers';
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
  console.log('GGGG');
  console.log(createObjectWithFlatParams(projectPresentation));
  const [formData, dispatch] = useReducer(ProjectPresentationFormReducer, {
    ...INITIAL_STATE,
    ...toType(projectPresentation, ProjectPresentation).toFormData(),
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
