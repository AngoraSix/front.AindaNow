import PropTypes from 'prop-types';
import React from 'react';
import ProjectPresentationView from './ProjectPresentationView.component';

const ProjectPresentationViewContainer = ({ projectPresentation }) => {
  return <ProjectPresentationView projectPresentation={projectPresentation} />;
};

ProjectPresentationViewContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectPresentationViewContainer;
