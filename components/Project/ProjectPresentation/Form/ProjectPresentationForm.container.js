import PropTypes from 'prop-types';
import React from 'react';
import ProjectPresentationForm from './ProjectPresentationForm.component';

const ProjectPresentationFormContainer = ({
  projectPresentation,
  isTriggeredAction,
}) => {
  return (
    <ProjectPresentationForm
      projectPresentation={projectPresentation}
      isTriggeredAction={isTriggeredAction}
    />
  );
};

ProjectPresentationFormContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectPresentationFormContainer;
