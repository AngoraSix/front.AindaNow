import PropTypes from 'prop-types';
import React from 'react';
import ProjectPresentationForm from './ProjectPresentationForm.component';

const ProjectPresentationFormContainer = ({ projectPresentation }) => {
  return <ProjectPresentationForm projectPresentation={projectPresentation} />;
};

ProjectPresentationFormContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectPresentationFormContainer;
