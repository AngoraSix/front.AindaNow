import PropTypes from 'prop-types';
import React from 'react';
import { useNotifications } from '../../../hooks/app';
import ManageProject from './ManageProject.component';

const ManageProjectContainer = ({ project }) => {
  const { onSuccess, onError: onNotificationError } = useNotifications();

  const onDone = () => {
    onSuccess('Project creted successfully.');
  };

  const onError = () => {
    onNotificationError('Error creating project.');
  };

  return <ManageProject project={project} onDone={onDone} onError={onError} />;
};

ManageProjectContainer.defaultProps = {};

ManageProjectContainer.propTypes = {
  project: PropTypes.object,
};

export default ManageProjectContainer;
