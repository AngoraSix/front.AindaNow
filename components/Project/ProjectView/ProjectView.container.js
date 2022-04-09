import PropTypes from 'prop-types';
import React from 'react';
import { useLoading, useNotifications } from '../../../hooks/app';
import ProjectView from './ProjectView.component';

const ProjectViewContainer = ({ project }) => {
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();

  return <ProjectView project={project} />;
};

ProjectViewContainer.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectViewContainer;
